var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "Choose a command",
            choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product", "EXIT"],
            name: "command"
        }
    ]).then(data => {
        switch (data.command) {
            case "View products for sale":
                viewCurrentStock();
                break;
            case "View low inventory":
                viewLowInventory();
                break;
            case "Add to inventory":
                addInventory();
                break;
            case "Add new product":
                addNewProduct();
                break;
            case "EXIT":
                process.exit();
                break;
        }
    });
}
function viewCurrentStock() {
    connection.query(
        "SELECT * FROM products",
        function (error, results, fields) {
            console.log(" ");
            console.log("<---------------- CURRENT STOCK FOR SALE ---------------->");
            console.log(" ");
            for (let i = 0; i < results.length; i++) {
                console.log("Product ID: " + colors.yellow(results[i].item_id) + "    Name: ".green + colors.yellow(results[i].product_name) + "    Department: ".green + colors.yellow(results[i].department_name) + "    Price: ".green + colors.yellow(results[i].price) + "    Stock: ".green + colors.yellow(results[i].stock_quantity));
                console.log("_______________________________________________________________________________________________________________".red);
                console.log(" ");
            }
            start();
        }
    );
}
function viewLowInventory() {
    var lowCount = 5;
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < ?",
        [lowCount],
        function (error, results, fields) {
            console.log(" ");
            console.log("<---------------- CURRENT STOCK WITH QUANTITY LESS THAN 5 ---------------->");
            console.log(" ");
            for (let i = 0; i < results.length; i++) {
                console.log("Product ID: " + colors.yellow(results[i].item_id) + "    Name: ".green + colors.yellow(results[i].product_name) + "    Department: ".green + colors.yellow(results[i].department_name) + "    Price: ".green + colors.yellow(results[i].price) + "    Stock: ".green + colors.yellow(results[i].stock_quantity));
                console.log("_______________________________________________________________________________________________________________".red);
                console.log(" ");
            }
            start();
        }
    );
}
function addInventory() {
    inquirer.prompt([
        {
            message: "Product ID to add to?",
            name: "id"
        },
        {
            message: "How many would you like to add?",
            name: "count"
        }
    ]).then(data => {
        connection.query(
            "SELECT * FROM products WHERE item_id = ?",
            [data.id],
            function (error, results, fields) {
                var newQuantity = results[0].stock_quantity + parseInt(data.count);
                connection.query(
                    "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                    [newQuantity, data.id],
                    function (error, results, fields) {
                        console.log(" ");
                        console.log("<---------------- Your database has been updated with new stock quantity ---------------->");
                        console.log(" ");
                        start();
                    }
                );
            }
        );
    });
}
function addNewProduct() {
    inquirer.prompt([
        {
            message: "Product Name?",
            name: "name"
        },
        {
            message: "Product Department?",
            name: "department"
        },
        {
            message: "Price?",
            name: "price"
        },
        {
            message: "Quantity?",
            name: "quantity"
        }
    ]).then(data => {
        connection.query(
            "INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)",
            [data.name, data.department, data.price, data.quantity],
            function (error, results, fields) {
                console.log("<--------------------- Item added to your database ----------------------->");
                console.log(" ");
                start();
            }
        );
    });

}
