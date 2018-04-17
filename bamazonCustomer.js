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

    connection.query(
        "SELECT * FROM products",
        function (error, results, fields) {
            console.log(" ");
            console.log("<---------- WELCOME TO MY SUPERSTORE. PLEASE BROWSE THE SELECTION AND MAKE A CHOICE BELOW. ---------->");
            console.log(" ");
            for (let i = 0; i < results.length; i++) {
                console.log("Product ID: " + colors.yellow(results[i].item_id) + "    Name: ".green + colors.yellow(results[i].product_name) + "    Department: ".green + colors.yellow(results[i].department_name) + "    Price: ".green + colors.yellow(results[i].price) + "    Stock: ".green + colors.yellow(results[i].stock_quantity));
                console.log("_______________________________________________________________________________________________________________".red);
                console.log(" ");
            }
            chooseItem();

        }
    );
}
function chooseItem() {
    inquirer.prompt([
        {
            message: "Product I.D. ?",
            name: "id"
        },
        {
            message: "How many would you like to purchase?",
            name: "count"
        }
    ]).then(data => {

        connection.query(
            "SELECT * FROM products WHERE item_id = ?",
            [data.id],
            function (error, results, fields) {
                var price = results[0].price;
                if (results[0].stock_quantity > parseInt(data.count)) {
                    var newStock = results[0].stock_quantity - parseInt(data.count);
                    var total = parseInt(data.count) * results[0].price;

                    connection.query(
                        "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                        [newStock, data.id],
                        function (error, results, fields) {
                            console.log("Congratulations. You're purchase is being processed.");
                            console.log(" ");
                            console.log("Total: " + data.count + " X $" + price + " = $" + total);
                            inquirer.prompt([
                                {
                                    type: "confirm",
                                    message: "Would you like to make another purchase?",
                                    name: "answer"
                                }
                            ]).then(data => {
                                if (data.answer) {
                                    start();
                                } else {
                                    process.exit();
                                }
                            });
                        }
                    );
                }
                if (results[0].stock_quantity < parseInt(data.count)) {
                    console.log(" ");
                    console.log("I'm Sorry. We cannot complete your order. Not enough in stock. Please choose again");
                    chooseItem();
                }
            }
        );
    });
}