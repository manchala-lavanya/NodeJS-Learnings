// file contains product and shopping cart classes, then exports them

class Product {
  constructor(productName, productPrice, quantity = 1) {
    this.productName = productName.trim().toLowerCase(); // name is immutable

    // Validation: name must not be empty
    if(!this.productName) {
        throw new Error("Product name cannot be empty.");   
    }

    //Validation: price must be a positive number
    if(isNaN(productPrice) || productPrice <= 0) { //Price validation
        throw new Error("Invalid price! Price must be a positive number.");
    }

    //Validation: quantity using static method
    if(!Product.isValidQuantity(quantity)) { //Quantity validation
        throw new Error("Quantity must be a positive integer.");
    }
    
    this.productPrice = productPrice; // price is mutable
    this.quantity = quantity; // quantity is mutable
  }

  //static function to validate quantity
  static isValidQuantity(quantity) {
        return Number.isInteger(quantity) && quantity > 0;
    }
}

class ShoppingCart {
  constructor() {
    // use Map with productName as key and product object as value
    this.productMap = new Map();
  }
 
  addProduct(product) 
  {
    if(this.productMap.has(product.productName)) { // check if product exists - increase quantity
        let existingProduct = this.productMap.get(product.productName);
        existingProduct.quantity += product.quantity;
        console.log(`Quantity of ${product.productName} updated to ${existingProduct.quantity}.`);
        return;
    }
    if(this.productMap.size >= 3)  //Cart size validation - only for unique products
    {
        console.log("You can only add upto 3 unique products in the cart.");
        return;
    }
    else 
    {
        this.productMap.set(product.productName, product); // add product to map
        console.log(`${product.productName} is added to cart (Quantity: ${product.quantity})`);
    }
  }
 
  removeProduct(productName) {
    if (this.productMap.has(productName)) { // check if product exists
      this.productMap.delete(productName); // remove product from map
      console.log(`${productName} is removed from cart`);
    } else { // product not found
      console.log(`${productName} is not found in cart`);
    }
  }
 
  calculateTotal() { // calculate total price of products in cart
    let total = 0;
    for (let product of this.productMap.values()) { 
      total += product.productPrice * product.quantity; // sum up price * quantity
    }
    return total;
  }
 
  viewCart() { // display all products in cart
    if (this.productMap.size === 0) { // check if cart is empty
      console.log("Cart is empty.");
      return;
    }
    console.log("\nProducts in Cart:");
    for (let product of this.productMap.values()) { // iterate over map values
      console.log(`- ${product.productName}: ${product.productPrice} x ${product.quantity} = ${product.productPrice * product.quantity}`); // display product details
    }
  }
}
 
module.exports = { Product, ShoppingCart }; // export classes for use in other files
