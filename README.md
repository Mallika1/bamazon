![bamazon Logo](https://github.com/Mallika1/bamazon/blob/master/Screenshots/bamazon.JPG))

:shopping_cart: -- **Bamazon** : Amazon-like storefront with the MySQL and node.js.

<Build Status Coverage Status First timers friendly>

The app will take in orders from customers and deplete stock from the store's inventory. App also has the ability to track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

:ok_hand: Suggestions, feature requests, and issues are more than welcome!

Give **Bamazon** a spin on the [Online demo »](https://drive.google.com/file/d/1JZzxTmOKVyYKDcAJQG8CQGxV0eFLv8vE/view).

## Why

- [x] Helps customer to buy product from store.
- [x] Allows store manager to add existing product to the inventory.
- [x] Allows store manager to add new product to the inventory.
- [x] Allows store Supervisor to add new department.

## Install

Using NPM (with node.js)

 `$npm install`

## Table of Contents

* [About](#About)
* [Functionality](#Functionality)
   - [Customer View](#bamazonCustomer )
       - [Command](#Command)
       - [Result](#Result)
       - [Validation](#Validation)
       - [Quit](#Quit)
   - [Manager View](#bamazonManager)
       - [Command](#Command)
       - [Result](#Result)
       - [Validation](#Validation)
       - [Quit](#Quit) 
   - [Supervisor View](#bamazonSupervisor)
       - [Command](#Command)
       - [Result](#Result)
       - [Validation](#Validation)
       - [Quit](#Quit)


## About

An interactive Node-based command-line (CLI) application that allows customers to buy product from the bamazon store.
Bamazon uses the mysql database to stroe the product information including product id, name, department, price and available quantity. App has 3 different view Customer View, Manager View and Supervisor View.

Below are the tables from database: 

| Products | Departments | 
| --- | --- |
| ![Product table](https://github.com/Mallika1/bamazon/blob/master/Screenshots/productTable.jpg)| ![Dept table](https://github.com/Mallika1/bamazon/blob/master/Screenshots/departmentTable.JPG)|


## Functionality

### Customer View 

#### Command
* `node bamazonCustomer` shows the customer view of the app. It displays the product table with the items avaible for sale.

![Product](https://github.com/Mallika1/bamazon/blob/master/Screenshots/customerview/1.JPG)


* Then, the app will prompt users with two messages:

    - ask them the ID of the product they would like to buy.
    - ask how many units of the product they would like to buy.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/customerview/2.JPG)

* If correct ID annd quantity provided app will place an order for the item.and displays the summery of the order.

#### Result
If customer places an order successfully, app update the database to reflect the remaining quantity of the product. Also product_sales column will be updated to show the total sales. Customer will be provided with the details of his order.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/customerview/2_1.JPG)

#### Validation: 
When customer wants to buy an item, the app will check if the store has enough of the product to meet the customer's request.

* If customer provides an item_id which does not exist in the inventory , app shows error message. 
  Also Thorws error if ID is null or 0 or not a number.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/customerview/3.JPG)

* If the store does not have enough of quantity the product,it will show another error message.
![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/customerview/4.JPG)

#### Quit
User can quit the app anytime by pressing Q.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/customerview/5.JPG)
   
### Manager View

#### Command
* `node bamazonManager` will display the Manager view of the app.It displays the following options for manager.
         
         - View Products for Sale
         - View Low Inventory
         - Add to Inventory
         - Add New Product
         
![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/Manager/1.JPG) 

* If manager selects `View Products for Sale` or `type 1`, the app lists every available item with the item IDs, names, prices, and quantities.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/Manager/2.JPG) 

* If manager selects `View Low Inventory` or `type 2`, app lists all items with an inventory count lower than five.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/Manager/3.JPG) 

#### Result

* If a manager selects `Add to Inventory` or `type 3`, app displays a prompt that will let the manager "add more" of any item currently in the store.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/Manager/4.JPG) 

* If a manager selects `Add New Product` or or `type 4`, app allows the manager to add a completely new product to the store.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/Manager/5.JPG) 

select `View Products for Sale` or `type 1`, app displays the newly created product.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/Manager/6.JPG) 

#### Validation
* `Add to Inventory` validates the input item ID . Thorws error if ID is null or 0 or a non existing id or not a number.
* `Add New Product` validates the input item ID . Thorws error if ID is null or 0 or an an existing id or not a number.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/Manager/7.JPG) 

#### Quit

* If manager selects `Exit` then app exits closing all the processes.

### Supervisor View

#### Command
* `node bamazonSupervisor` will display the Supervisor view of the app.It displays the following options for supervisor.

         - View Product Sales by Department
         - Create New Department

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/supervisor/1.JPG) 

* Supervisor selects `View Product Sales by Department` or `type 1`, app displays a summarized table using product table and departments table. 

* `total_profit` column is calculated on the fly using the difference between `over_head_costs` and `product_sales`.     `total_profit` is not stored in any database.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/supervisor/2.JPG) 

#### Result
* Supervisor selects `Create New Department` or `type 2`, app allows the manager to add a completely new department to the store.

* Now Manager can add new products to the newly created department.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/supervisor/3.JPG) 

select `View Product Sales by Department`, now it displays the newly added department.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/supervisor/4.JPG) 

#### Validation
 * `Create New Department` validates the input department ID . Thorws error if ID is null or 0 or an an existing id or not a number.

#### Quit
Press 3 to quit.
