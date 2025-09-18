// Example 2: Dynamic Prototype Pattern
function Car(model) {//class
  this.model = model;
  if (typeof Car.prototype.drive !== 'function') {
       Car.prototype.drive = function() {
          return `${this.model} is driving.`;
      };
    }
 }
 const c1 = new Car('Tesla');
 const c2 = new Car('BMW');
console.log(c1.drive()); // Tesla is driving.
console.log(c2.drive()); // BMW is driving.

// Example 3: Inheritance with ES6 Classes
class Shape {
    #color; // private field
    static description = 'This is a shape'; // static property
    constructor(color) {
        this.color = color;
    }
    describe() {
        return `A ${this.color} shape.`;
    }
}
//access static property
Shape.description = 'Updated shape description';
console.log(Shape.description); // This is a shape

class Circle extends Shape {// prop1
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
}

const circle = new Circle('red', 5);
console.log(circle.describe()); // A red shape.
console.log(circle.area()); // 78.53981633974483
const shape = new Shape('green');
// shape.#color = 'blue'; // public field
// console.log(shape.#color); // undefined, private field


 // Example 1: Prototypal Inheritance with Constructor Functions
function Animal(name) {//class
    this.name = name;
}
Animal.prototype.speak = function () {
    return `${this.name} makes a noise.`;
};
const a = new Animal('Generic Animal');
console.log(a.speak());
const b = new Animal('Tom');
console.log(b.speak());
console.log(a === b);//false
// ES5 -> object based version of JS
function Dog(name, breed) { //Is-A relationship
    Animal.call(this, name); // Call parent constructor, super(), 
    this.breed = breed;
}
// Inherit from Animal
Dog.prototype = Object.create(Animal.prototype);//extends
Dog.prototype.constructor = Dog;
// // Override speak method
Dog.prototype.speak = function() {
    return `${this.name} barks.`;
};

const d = new Dog('Rex', 'German Shepherd');
console.log(d.speak()); // Rex barks.
console.log(d instanceof Dog); // true
console.log(d instanceof Animal); // true
