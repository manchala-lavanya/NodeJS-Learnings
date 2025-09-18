//Product class
class Product 
{
  constructor(name, price) 
  {
    this.name = name;   // product name (immutable)
    this.price = price; // product price (mutable)
  }
}

//ShoppingCart class
class ShoppingCart 
{
  constructor() 
  {
    this.products = []; // array to store products
  }
 
  //Add product to cart
  addProduct(product) 
  {
    this.products.push(product); // add product to array
    console.log(`${product.name} added to cart`); 
  }
 
  //Remove product by name
  removeProduct(productName) 
  {
    this.products = this.products.filter(p => p.name !== productName); // filter out the product
    console.log(`${productName} removed from cart`); 
  }
 
  //Calculate total price
  calculateTotal() 
  {
    let total = 0;
    for (let p of this.products) 
    {
      total += p.price;
    }
    return total;
  }
}
 
//--- Example Purpose ---
let p1 = new Product("Laptop", 50000);
let p2 = new Product("Phone", 20000);
let p3 = new Product("Headphones", 3000);
 
//Create cart
let cart = new ShoppingCart();
 
//Add products
cart.addProduct(p1);
cart.addProduct(p2);
cart.addProduct(p3);
 
//Remove one product
cart.removeProduct("Phone");
 
//Show total
console.log("Total Price:", cart.calculateTotal());