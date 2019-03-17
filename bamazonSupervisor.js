let mysql = require('mysql');
let inquirer = require("inquirer");
//For Terminal string styling
let chalk = require("chalk");
//For Table formatting
var Table = require('cli-table');
//Database configuration 
let config = require('./config.js');

let connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) throw err;
  displayAvailableProducts();
  // displaySupMenuOptions();
});

//Display inventory to customer
function displayAvailableProducts() {
  var query = "SELECT item_id, product_name, price, stock_quantity, product_sales FROM products";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    // console.log(chalk.yellow.bold("\nBelow is the list of items on sale:"));
    console.table(res);
    displaySupMenuOptions();
 
  });
};

function displaySupMenuOptions() {
  inquirer.prompt({
    name: "options",
    type: "rawlist",
    message: "What you want to do?",
    choices: ["View Product Sales by Department", "Create New Department", "Exit"]

  }).then((answer) => {

    switch (answer.options) {
      case "View Product Sales by Department":
        showProdSalesByDept();
        break;

      case "Create New Department":
        createNewDept();
        break;

      case "Exit":
        process.exit(0);
        break;
    }
  });
};

function showProdSalesByDept() {
  var query = "select d.department_id, d.department_name, d.over_head_costs, p.product_sales,(p.product_sales - d.over_head_costs) AS total_profit from departments d LEFT JOIN products p ON d.department_name = p.department_name";
  connection.query(query, (err, res) => {
    console.table(res);
    displaySupMenuOptions();
  });
};

function createNewDept() {
  inquirer.prompt([{
        name: "deptID",
        type: "input",
        message: "Enter the new department ID:"
      },
      {
        name: "deptName",
        type: "input",
        message: "Enter the new department name:"
      },
      {
        name: "overHeadCost",
        type: "input",
        message: "Enter the over head cost:"
      },
    ])
    .then(function (answer) {
      console.log(answer.deptName, answer.overHeadCost);
      addNewDept(answer.deptID, answer.deptName, answer.overHeadCost);
    });
};

function addNewDept(deptId, deptName, oHCost) {
  let query = "INSERT into departments SET ?";
  let input1 = {
    department_id: deptId,
    department_name: deptName,
    over_head_costs: oHCost
  };
  var sqlQuery = connection.query(query, [input1], (err, res) => {
    if (err) throw err;
    console.log("Following department is added.");
    var query = "SELECT * from departments WHERE ?";
    let product = {
      department_id: deptId
    };
    let sqlQuery = connection.query(query, [product], (err, res) => {
      if (err) throw err;
      console.table(res);
      displaySupMenuOptions();
    });
  });
 
  // console.log(sqlQuery.sql);
};