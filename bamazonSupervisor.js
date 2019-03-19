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
  // displayAvailableProducts();
  displaySupMenuOptions();
 
});

//Display inventory to the Supervisor
function displayAvailableProducts() {
  var query = "SELECT item_id, product_name, department_name, price, stock_quantity, ifNull(product_sales,0) as product_sales  FROM products";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    // displaySupMenuOptions();
 
  });
};

//Prompt for what Supervisor can do.
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

//Show product sale by department.
function showProdSalesByDept() {
  displayAvailableProducts();
  var query = "Select d.department_id, d.department_name, d.over_head_costs, sum(ifNull(p.product_sales,0)) as Product_Sales,sum(ifNull(p.product_sales,0)- ifNull(d.over_head_costs,0)) AS total_profit from departments d LEFT JOIN products p ON d.department_name = p.department_name GROUP by d.department_name";
  
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    displaySupMenuOptions();
  });
};

//Create a new product
function createNewDept() {
  var query = "SELECT * from departments";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
 
  inquirer.prompt([{
        name: "deptID",
        type: "input",
        message: "Enter the new department ID:",
        validate: function (value) {
          if (value !== "" && isNaN(value) == false && value > 0) {
            return true;
          } else {
            return chalk.bgRed("**ERROR** Invalid Department ID, enter a new  department ID");
          }
        }
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
      var isDeptExits = validateDeptId(answer.deptID, res)
      if(isDeptExits == false){
      addNewDept(answer.deptID, answer.deptName, answer.overHeadCost);
      }else{
        console.log(chalk.bgRed("**ERROR** Invalid ID, ID you provided already exits in the database"));
      }
    });
  });
};

//Add a new department.
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
};

function validateDeptId(inputDeptID, departments) {
  for (let i = 0; i < departments.length; i++) {
    if (departments[i].department_id == inputDeptID) {
      return true;
    }
  }
  return false;
};
