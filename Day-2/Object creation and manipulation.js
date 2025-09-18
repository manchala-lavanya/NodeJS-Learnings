// Complex Example: Object Creation, Manipulation, and Property Descriptors

// 1. Creating an object with Object.create and custom prototype
const personProto = {
    greet() {
        return `Hello, my name is ${this.name}`;
    }
};

const person = Object.create(personProto, {
    name: {
        value: 'Alice',
        writable: true,
        enumerable: true,
        configurable: true
    },
    age: {
        value: 30,
        writable: false, // age cannot be changed
        enumerable: true,
        configurable: false
    }
});

console.log(person.greet()); // Hello, my name is Alice
console.log(person.age); // 30
person.age = 35; // No effect, writable: false
console.log(person.age); // 30

// 2. Adding and deleting properties dynamically
person.city = 'New York';
console.log(person.city); // New York

delete person.city;
console.log(person.city); // undefined

// 3. Using Object.defineProperty to add a computed property
Object.defineProperty(person, 'birthYear', {
    get: function() {
        return new Date().getFullYear() - this.age;
    },
    enumerable: true
});

console.log(person.birthYear); // e.g., 1995

// 4. Enumerating properties
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}
// Output includes: name, age, birthYear

// 5. Freezing the object to prevent further changes
Object.freeze(person);
person.name = 'Bob'; // No effect
person.country = 'USA'; // No effect
console.log(person.name); // Alice
console.log(person.country); // undefined

// 6. Cloning and merging objects
const address = { city: 'Boston', zip: '02118' };
const clonedPerson = Object.assign({}, person, address);

console.log(clonedPerson);
// { name: 'Alice', age: 30, birthYear: 1995, city: 'Boston', zip: '02118'
