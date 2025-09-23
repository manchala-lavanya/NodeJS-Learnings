
const sum = (a, b) => {
    // console.log(arguments); // 'arguments' object is not available in arrow functions
    console.log(a,b);
    return  a + b
};

console.log(sum(2, 3)); // Should print 5