// Example: Defining Properties and Methods in JavaScript Objects
// 1. Object literal with properties and methods
const book = {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    year: 2008,
    getSummary() {//method
        return `${this.title}+' by'+ ${this.author}, published in ${this.year}.`;
    },
    updateYear(newYear) {
        this.year = newYear;
    }
};
console.log(book.getSummary()); // JavaScript: The Good Parts by Douglas Crockford, published in 2008.
book.updateYear(2020);
console.log(book.year); // 2020

// 2. Adding properties and methods dynamically
book.genre = "Programming";//mutable
book.getGenre = function() {
    return `Genre: ${this.genre}`;
};

console.log(book.getGenre()); // Genre: Programming

// 3. Using Object.defineProperty for advanced property control
Object.defineProperty(book, 'edition', {
    value: 2,
    writable: false, // cannot change edition
    enumerable: false,
    configurable: true
});
console.log(book.edition); // 2

book.edition = 3; // No effect, writable: false, no error 
console.log(book.edition); // 2

Object.defineProperty(book, 'edition', {
    writable: true // cannot change edition
});
book.edition = 3; // No effect, writable: false, no error 
console.log(book.edition); // 2

// 4. Iterating over properties and methods
for (let key in book) {
    if (typeof book[key] !== 'function') {
        console.log(`${key}: ${book[key]}`);
    }
}
