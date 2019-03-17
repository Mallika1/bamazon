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
  displayManagerMenuOptions();
});

function displayManagerMenuOptions() {
  inquirer.prompt({
    name: "options",
    type: "rawlist",
    message: "What you want to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]

  }).then((answer) => {
    switch (answer.options) {
      case "View Products for Sale":
        viewProductForSale();
        break;

      case "View Low Inventory":
        ViewLowInventory();
        break;

      case "Add to Inventory":
        addToInventory();
        break;

      case "Add New Product":
        addNewProduct();
        break;

      case "Exit":
        connection.end();
        break;
    }
  });
};

function viewProductForSale() {
  var query = "SELECT * FROM products";
  connection.query(query, (err, res) => {
    console.table(res);
    displayManagerMenuOptions();
  });
};

function ViewLowInventory() {
  var query = "SELECT * from products WHERE stock_quantity <100";
  connection.query(query, (err, res) => {
    console.table(res);
    displayManagerMenuOptions();
  });
};

//add inventory for existing products
function addToInventory() {
  // viewProductForSale();
  var query = "SELECT * FROM products";
  connection.query(query, (err, res) => {
    console.table(res);
    inquirer.prompt([{
          name: "productId",
          type: "input",
          message: "Enter the product ID you want to add more to inventory:",
          validate: function (value) {
            if (value !== "" && isNaN(value) == false && value > 0 && value < 11) {
              return true;
            } else {
              return chalk.bgRed("**ERROR** Invalid ID, enter a valid ID from the table");
            }
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "Enter the quantity you want to add to inventory:",
          validate: function (value) {
            if (value !== "" && isNaN(value) == false && value > 0) {
              return true;
            } else {
              return chalk.bgRed("**ERROR** Enter a number greater than");
            }
          }
        }
      ])
      .then(function (answer) {
        updateProductInventory(answer.productId, answer.quantity);
      });
  });
};

function updateProductInventory(prodID, newQuantity) {
  var query = "SELECT stock_quantity FROM products where ?";
  let product = {
    item_id: prodID
  };
  let sqlQuery = connection.query(query, [product], (err, res) => {
    if (err) throw err;
    let totalQuantity = Number.parseInt(newQuantity) + Number.parseInt(res[0].stock_quantity);
    let query = "UPDATE products SET ? WHERE ?";
    let input1 = {
      stock_quantity: totalQuantity
    };
    let input2 = {
      item_id: prodID
    };

    let sqlQuery = connection.query(query, [input1, input2], (err, res) => {
      if (err) throw err;
      console.log("\n Inventory for the folowing product updated.\n");
      var query = "SELECT * from products WHERE ?";
      let product = {
        item_id: prodID
      };
      let sqlQuery = connection.query(query, [product], (err, res) => {
        console.table(res);
        displayManagerMenuOptions();
      });
    });
  });
};

function addNewProduct() {
  var query = "SELECT * FROM products";
  connection.query(query, (err, res) => {
    console.table(res);
  inquirer.prompt([{
        name: "productId",
        type: "input",
        message: "Enter the new product ID you want to add to the inventory:",
        validate: function (value) {
          if (value !== "" && isNaN(value) == false && value > 0) {
            return true;
          } else {
            return chalk.bgRed("**ERROR** Invalid ID, enter a valid ID from the table");
          }
        }
      },
      {
        name: "productName",
        type: "input",
        message: "Enter the new product name you want to add to the inventory:"
      },
      {
        name: "department",
        type: "list",
        message: "Which Department does this product fall into:",
        choices: ["Sports", "Kitchen","Electronics","Video Games","Home Decor", "Toys", "Clothing"]
      },
      {
        name: "price",
        type: "input",
        message: "Enter the price of the new product:"

      },
      {
        name: "quantity",
        type: "input",
        message: "Enter the quantity of the product:",
        validate: function (value) {
          if (value !== "" && isNaN(value) == false && value > 0) {
            return true;
          } else {
            return chalk.bgRed("**ERROR** Enter a number greater than");
          }
        }

      },
    ])
    .then(function (answer) {
      addNewProdInventory(answer.productId, answer.productName, answer.department, answer.price, answer.quantity);
    });
  });
};

function addNewProdInventory(productId, productName, department, price, quantity) {
  let query = "INSERT into products SET ?";
  let input1 = {
    item_id: productId,
    product_name: productName,
    department_name: department,
    price: price,
    stock_quantity: quantity
  };
  let sqlQuery = connection.query(query, [input1], (err, res) => {
    if (err) throw err;
    console.log("\n Following item is added in the inventory \n");
    let query1 = "SELECT * from products WHERE ?";
    let product = {
      item_id: productId
    };
    let sqlQuery = connection.query(query1, [product], (err, res) => {
      console.table(res);
      displayManagerMenuOptions();
    });
  });
};