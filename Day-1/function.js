//namespace
cts = {};
function sum(a, b, c) { //v1
    console.log('v1');
    return a + b + 1;
}
cts.sum = sum;
var sum = (a,b) => { //v2, flobal
    return a + b;
}

var result = sum(2, 3, 4, 6); //5
console.log(result);
console.log(cts.sum);

var result1 = cts.sum(2, 3, 4, 6); //6
console.log(result1);