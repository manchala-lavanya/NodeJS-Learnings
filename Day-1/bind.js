const object = {
    a: 1,
    getA() {
        return this;
    }
};

console.log(object.getA.call({ test: 123 })); //1
console.log(object.getA()); //1
const getARef = object.getA;
const newGetA = getARef.bind({ bindtest: 123 }); //{ bindtest: 123 }
console.log(newGetA()); //{ bindtest: 123 }
