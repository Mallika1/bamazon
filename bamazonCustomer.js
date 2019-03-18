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
  console.log(chalk.green.bold("\n************************************************************************************"));
  console.log(chalk.green.bold("\n\t\t\t WELCOME TO BAMAZON "));
  console.log(chalk.green.bold("\n************************************************************************************"));
  displayAvailableProducts();

});

//Display inventory to customer
function displayAvailableProducts() {
  var query = "SELECT item_id, product_name, price, stock_quantity, product_sales FROM products";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(chalk.yellow.bold("\nBelow is the list of items on sale:"));
    console.table(res);
    promptForItemID(res);

  });
};

//Promt the customer for the item id he/she wants to purchase.
function promptForItemID(inventory) {
  inquirer.prompt([{
      name: "productId",
      type: "input",
      message: "What is the ID of the product you would like to buy [Quit? press Q]:",
      validate: function (value) {
        return !isNaN(value) || value.toLowerCase() === 'q';
      }
    }])
    .then(function (answer) {
      //check if customer wats to quit
      exit(answer.productId);
      var itemId = Number.parseInt(answer.productId);
      var product = validateItemId(itemId, inventory);
      //if customer provided item id is valid then promt for quantity. 
      if (product) {
        promptForQuantity(product);
      } else {
        console.log(chalk.bgRed("**ERROR** Invalid ID, enter a valid ID from the table"));
        displayAvailableProducts();
      }
    });
}

//Validate customer input item id.
function validateItemId(inputItemId, inventory) {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id == inputItemId) {
      return inventory[i];
    }
  }
  return null;
}

//Prompt the customer for the quantity of the item.
function promptForQuantity(product) {
  inquirer.prompt([{
      name: "quantity",
      type: "input",
      message: "How many you would like to buy? [Quit? press Q]",
      validate: function (value) {
        return value > 0 || value.toLowerCase() === 'q';
      }
    }])
    .then(function (answer) {
      exit(answer.quantity);
      var quantity = Number.parseInt(answer.quantity);
      //Customer input quantity is more then the stock quantity display message.
      if (quantity > product.stock_quantity) {
        console.log(chalk.bgRed("**ERROR** Insufficient Quantity, enter a valid quantity from the table"));
        displayAvailableProducts();
      }
      //Otherwise place the order for customer.
      else {
        placeOrder(product, quantity);
      }

    });
};

//Place customer order and update the databse.
function placeOrder(product, uiQuantity) {
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
  var prodPrice = product.price;
  var subTotal = Number.parseFloat(uiQuantity * prodPrice).toFixed(2);
  table.push([product.item_id, product.product_name, uiQuantity, prodPrice, subTotal]);

  console.log(table.toString());
  console.log(chalk.cyan.bold("**********************************************************************"));
  updateDB_Quantity(product.stock_quantity, uiQuantity, product.item_id, product.price, product.product_sales);

}

//Update the database after customer purchased the product.
function updateDB_Quantity(dbStockQuantity, uiQuantity, prodID, price, prodSales) {
 
  let newQuantity = dbStockQuantity - uiQuantity;
  prodSales = price * uiQuantity;
  
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
    displayAvailableProducts();
  });
};

//Quit anytime by pressing Q.
function exit(isExit) {
  if (isExit === "q") {
    console.log("\n\tThank you for visiting!");
    console.log("\n\t\tCome back soon!");

    process.exit(0);
  }
}