// // Example 1: Basic Closure
// function outer() {
//   let count = 0;
  let inner = ()=> {
    count++;
    return count;
  }
  const obj1 = new inner();
//   return inner;
// }

// const counter = outer();
// console.log(counter()); // 1
// console.log(counter()); // 2

// Example 2: Closure with Parameters
function makeMultiplier(factor) {
  return function(x) {
    return x * factor;
  };
}

const double = new makeMultiplier(2);
console.log(double(5)); // 10 

// Example 3: Private Variables with Closures
function secretHolder(secret) {
  return {
    getSecret: function() {
      return secret;
    },
    setSecret: function(newSecret) {
      secret = newSecret;
    }
  };
}

// const holder = secretHolder('abc');
// console.log(holder.getSecret()); // 'abc'
// holder.setSecret('xyz');
// console.log(holder.getSecret()); // 'xyz'


// // True or False:
// // A closure can access variables from its parent function even after the parent function has finished executing.

// // What is the main use case of closures in JavaScript?