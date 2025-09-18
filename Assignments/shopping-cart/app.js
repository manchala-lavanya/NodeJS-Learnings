// This file uses shopping.js 

const readline = require('readline');
const { Product, ShoppingCart } = require('./shopping');  // import classes
 
const rl = readline.createInterface( // readline interface
{
  input: process.stdin,
  output: process.stdout
});
 
const cart = new ShoppingCart();
 
function showMenu() 
{
  console.log("\n===== Shopping Cart Menu =====");
  console.log("1. Add Product");
  console.log("2. Remove Product");
  console.log("3. Show Total Price");
  console.log("4. Exit");
 
  rl.question("Enter your choice: ", (choice) => {
    switch (choice) 
    {
      case "1":
        rl.question("Enter product name: ", (name) => {
          rl.question("Enter product price: ", (price) => {
            const product = new Product(name, parseFloat(price));
            cart.addProduct(product);
            showMenu();
          });
        });
        break;
 
      case "2":
        rl.question("Enter product name to remove: ", (name) => {
          cart.removeProduct(name);
          showMenu();
        });
        break;
 
      case "3":
        console.log("Total Price:", cart.calculateTotal());
        showMenu();
        break;
 
      case "4":
        console.log("Goodbye!");
        rl.close();
        break;
 
      default:
        console.log("Invalid choice, please try again.");
        showMenu();
    }
  });
}
 
// start program
showMenu();
