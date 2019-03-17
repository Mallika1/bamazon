let mysql = require('mysql');
let inquirer = require("inquirer");
//For Terminal string styling
let chalk = require("chalk");
//For Table formatting
var Table = require('cli-table');
//Database configuration 
let config = require('./config.js');

let connection = mysql.createConnection(config);

connection.connect(function (err) {
  if (err) throw err;
  console.log(chalk.green.bold("\n********************************************************************************"));
  console.log(chalk.green.bold("\n\t\t\t WELCOME TO BAMAZON "));
  console.log(chalk.green.bold("\n********************************************************************************"));
  displayAvailableProducts();

});

function displayAvailableProducts() {
  var query = "SELECT item_id, product_name, price FROM products";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(chalk.yellow.bold("\nBelow is the list of items on sale:"));
    console.table(res);
    placeOrders();
  });
};

//Function for prompts to buy more or quit
function contiueShopping() {
  inquirer.prompt([{
      name: "continue",
      type: "confirm",
      message: chalk.green("Do you want to puchase another product?")
    }])
    .then(function (response) {
      if (response.continue == true) {
        displayAvailableProducts();
      } else {
        console.log("\n\tThank you for visiting!");
        console.log("\n\t\tCome back soon!");
        connection.end();
      }
    })
};

function placeOrders() {
  inquirer.prompt([{
        name: "productId",
        type: "input",
        message: "1. What is the ID of the product you would like to buy:",
        validate: function (value) {
          if (value !== "" && isNaN(value) && value > 0 && value < 11) {
            return true;
          } else {
            return chalk.bgRed("**ERROR** Invalid ID, enter a valid ID from the table");
          }
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "2. how many units of the product you would like to buy?",
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
      checkProductAvailability(answer.productId, answer.quantity);
    });
}

function checkProductAvailability(prodID, quantity) {
  let query = "SELECT product_name,stock_quantity, price,product_sales FROM products WHERE ?";
  let product = {
    item_id: prodID
  };
  let sqlQuery = connection.query(query, [product], (err, res) => {
    if (err) throw err;
    let prodSales = Number(res[0].product_sales);
    let price = Number(res[0].price);
    let dbStockQuantity = Number.parseInt(res[0].stock_quantity);
    let uiQuantity = Number.parseInt(quantity);

    if (dbStockQuantity > uiQuantity) {
      console.log(chalk.cyan.bold("\n********************************************************************"));
      console.log(chalk.magenta.bold("Your order has been processed successfully.Thank you for Shopping!" + "\n"));

      console.log(chalk.red.underline.blue("Your Order Details:" + "\n"));

      var table = new Table({
        head: ['ITEM ID', 'PRODUCT NAME', 'QUANTITY', 'PRICE', 'TOTAL PRICE'],
        style: {
          head: ['yellow'],
          compact: true,
          colAligns: ['center'],
          "padding-left": 2,
          "padding-right": 2
        }
      });
      var subTotal = Number.parseFloat(uiQuantity * price).toFixed(2);
      table.push([prodID, res[0].product_name, uiQuantity, price, subTotal]);

      console.log(table.toString());
      console.log(chalk.cyan.bold("**********************************************************************"));
      updateDB_Quantity(dbStockQuantity, uiQuantity, prodID, price, prodSales);
    } else {
      console.log(chalk.yellow("\nYour product choice is: ") + chalk.white.bold(res[0].product_name) + " " + chalk.yellow("for a quantity of") + " " + chalk.white.bold(quantity));
      console.log(chalk.yellow("\nWe currently have a quantity of ") + chalk.white.bold(res[0].stock_quantity) + " " + chalk.yellow("for this product"));
      contiueShopping();
    }
  });
};


function updateDB_Quantity(dbStockQuantity, uiQuantity, prodID, price, prodSales) {
  let newQuantity = dbStockQuantity - uiQuantity;
  prodSales = prodSales + price * uiQuantity;
  let query = "UPDATE products SET ? WHERE ?";
  let input1 = {
    stock_quantity: newQuantity,
    product_sales: prodSales
  };
  let input2 = {
    item_id: prodID
  };
  let sqlQuery = connection.query(query, [input1, input2], (err, res) => {
    if (err) throw err;
    contiueShopping();
  });
};

// function prodIdValidation(value){


//     if (value!=="" && isNaN(value) == false &&  value >0 && value<11 ) {
//         return true;
//     } else {
//         return chalk.bgRed("**ERROR** Invalid ID, enter a valid ID from the table");
//     }
// };