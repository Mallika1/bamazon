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
* `node bamazonCustomer` will display the product table with the items avaible for sale.

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

* If customer provided an item_id which does not exist in the inventory , it will show an error. 

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/customerview/3.JPG)

* If the store does not have enough of quantity the product,it will show another error message.
![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/customerview/4.JPG)

#### Quit
User can quit the app anytime by pressing Q.

![Prompt](https://github.com/Mallika1/bamazon/blob/master/Screenshots/customerview/5.JPG)
   
### Manager View

### Supervisor View
