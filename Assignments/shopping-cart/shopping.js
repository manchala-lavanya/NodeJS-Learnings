// contains product and shopping cart classes, then exports them
 
class Product {
  constructor(productName, productPrice) {
    this.productName = productName;
    this.productPrice = productPrice;
  }
}
 
class ShoppingCart {
  constructor() {
    this.productList = [];
  }
 
  addProduct(product) {
    this.productList.push(product);
    console.log(`${product.productName} added to cart`);
  }
 
  removeProduct(productName) {
    this.productList = this.productList.filter(item => item.productName !== productName);
    console.log(`${productName} removed from cart`);
  }
 
  calculateTotal() {
    let total = 0;
    for (let item of this.productList) {
      total += item.productPrice;
    }
    return total;
  }
}
 
// Exporting classes so it can be used in other files
module.exports = { Product, ShoppingCart };