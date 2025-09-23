
const sum = function (a, b) {
  return a + b
}
console.log(sum)
// The value of sum is an anonymous function, not a named function.

// -------------
const sum1 = function namedSumFunction(a, b) {
  if (!a || !b) throw new Error('Parameters are required.')

  return a + b
}
sum1();


const sum2 = (a, b) => {
  return a + b
}

// Arrow Function Behavior and Syntax
// Arrow functions have a few important distinctions in how they work that distinguish them from traditional functions, as well as a few syntactic enhancements. The biggest functional differences are that arrow functions do not have their own this binding or prototype and cannot be used as a constructor. Arrow functions can also be written as a more compact alternative to traditional functions, as they grant the ability to omit parentheses around parameters and add the concept of a concise function body with implicit return.


// Arrow functions have lexical this, meaning the value of this is determined by the surrounding scope (the lexical environment).

// We will demonstrate the difference between how traditional and arrow functions handle this. In the following printNumbers object, there are two properties: phrase and numbers. There is also a method on the object, loop, which should print the phrase string and the current value in numbers:

const printNumbers = {
  phrase: 'The current value is:',
  numbers: [1, 2, 3, 4],

  loop() {
    this.numbers.forEach(function (number) {
      console.log(this.phrase, number)
    })
  },
}
// One might expect the loop function to print the string and current number in the loop on each iteraton. However, in the result of running the function the phrase is actually undefined:

printNumbers.loop()
/* This will give the following:

Output
undefined 1
undefined 2
undefined 3
undefined 4
*/
// As this shows, this.phrase is undefined, indicating that this within the anonymous function passed into the forEach method does not refer to the printNumbers object. This is because a traditional function will not determine its this value from the scope of the environment, which is the printNumbers object.

// In older versions of JavaScript, you would have had to use the bind method, which explicitly sets this. This pattern can be found often in some earlier versions of frameworks, like React, before the advent of ES6.

// Use bind to fix the function:

const printNumbers1 = {
  phrase: 'The current value is:',
  numbers: [1, 2, 3, 4],

  loop() {
    // Bind the `this` from printNumbers to the inner forEach function
    this.numbers.forEach(
      function (number) {
        console.log(this.phrase, number)
      }.bind(this),
    )
  },
}

printNumbers1.loop()
// This will give the expected result:

