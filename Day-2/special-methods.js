const obj = {
    age: 25
};
Object.freeze(obj); // Prevent adding/removing/modifying properties
console.log(Object.isFrozen(obj)); // true

obj.age = 30; // Modifying existing property
console.log(obj.age); // 25
