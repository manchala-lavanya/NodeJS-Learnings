function foo() {
    console.log(this);
}
var cts = {};
cts.foo = foo;
cts.foo(); //context is cts object
console.log('---------------------');
foo(); //context is global object 
//apply
const customContext = { name: 'Lavanya' };
// foo.apply(customContext); //context is customContext object
foo.call(customContext, 1, 2); //context is customContext object

