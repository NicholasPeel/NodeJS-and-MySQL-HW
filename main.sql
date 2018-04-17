DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(

    item_id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(item_id),
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canon EOS Rebel T6 Digital SLR Camera", "Electronics", 354.40, 5), ("Kenmore Smart French Door Bottom Mount Refrigerator", "Appliances", 2189.99, 9), ("Under Armour Mens Tech Short Sleeve T-Shirt", "Clothing", 19.99, 35), ("Learning Web Design: A Beginners Guide", "Books", 18.95, 3), ("Meguiars G55146 Essentials Car Care Kit", "Automotive", 65.00, 22), ("Apple 15inch MacBook Pro", "Computers", 2549.00, 3), ("Clarisonic Mia Sonic Facial Cleansing Brush System", "Health & Beauty", 99.00, 43), ("Greenworks 40V Brushless Cordless Mower", "Garden", 399.00, 14), ("Purina Tidy Cats Performance Clumping Cat Litter", "Pet Supplies", 18.99, 68), ("LEGO Star Wars Millennium Falcon", "Toys", 169.99, 32);

SELECT * FROM products;