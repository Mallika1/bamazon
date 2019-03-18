DROP DATABASE IF EXISTS bamazon;

create database bamazon;
USE bamazon;
create table products
    (
        item_id INT AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(500) NOT NULL,
        department_name VARCHAR(500) NULL,
        price Decimal(10,2) NULL,
        stock_quantity INT NULL
    );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
    ('Toddler Helmet', 'Sports', '16.65', '5'),
    ("Pullover Sweater", "Clothing", '27.99', '121'),
    ('Laptop', 'Electronics', '370.99', '436'),
    ('Rescue Helicopter', 'Toys', '33.99', '39'),
    ('Stoneware Dish', 'Kitchen', '42.49', '34'),
    ('Headset', 'Electronics', '19.99', '58'),
    ('Redemption', 'Video Games', '16.99', '45'),
    ('FIFA', 'Video Games', '12.99', '200'),
    ('Throw Pillow', 'Home & Decor', '23.99', '357'),
    ('Toy Story', 'Toys', '24.99', '124')
;


SELECT * from products;

create table departments (

    department_id INT(10) AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(200) NULL,
    over_head_costs INT(10)
) ;

ALTER TABLE products
ADD product_sales decimal(10,2) DEFAULT 0  AFTER price;

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES 
('01', 'Sports', '2000'),
("02", "Clothing", '3000'),
('03', 'Kitchen', '5000'),
('04', 'Toys', '9000'),
('05', 'Video Games', '4000'),
('06', 'Electronics', '5000'),
('07', 'Home & Decor', '5000')
;

select * from departments;

-- Select d.department_name,  sum(ifNull(p.product_sales,0)) as Product_Sales,sum(ifNull(p.product_sales,0)- ifNull(d.over_head_costs,0)) AS total_profit from departments d LEFT JOIN products p ON d.department_name = p.department_name GROUP by d.department_name"