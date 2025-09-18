const readline = require('readline');

// Product class
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}
 
// ShoppingCart class
class ShoppingCart {
  constructor() {
    this.products = [];
  }
 
  addProduct(product) {
    this.products.push(product);
    console.log(`${product.name} added to cart`);
  }
 
  removeProduct(productName) {
    this.products = this.products.filter(p => p.name !== productName);
    console.log(`${productName} removed from cart`);
  }
 
  calculateTotal() {
    let total = 0;
    for (let p of this.products) {
      total += p.price;
    }
    return total;
  }
}
 
// create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 
const cart = new ShoppingCart();
 
function showMenu() {
  console.log("\nChoose an option:");
  console.log("1. Add Product");
  console.log("2. Remove Product");
  console.log("3. Show Total Price");
  console.log("4. Exit");
 
  rl.question("Enter your choice: ", (choice) => {
    if (choice === "1") {
      rl.question("Enter product name: ", (name) => {
        rl.question("Enter product price: ", (price) => {
          let p = new Product(name, parseFloat(price));
          cart.addProduct(p);
          showMenu();
        });
      });
    } else if (choice === "2") {
      rl.question("Enter product name to remove: ", (name) => {
        cart.removeProduct(name);
        showMenu();
      });
    } else if (choice === "3") {
      console.log("Total Price:", cart.calculateTotal());
      showMenu();
    } else if (choice === "4") {
      console.log("Goodbye!");
      rl.close();
    } else {
      console.log("Invalid choice, try again.");
      showMenu();
    }
  });
}
 
// start program
showMenu();
 