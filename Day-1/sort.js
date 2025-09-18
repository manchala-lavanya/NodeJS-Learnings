function   sortArray(arr) {
    const array1  = [3,1,4,11, 2];
    array1.splice(2, 2);
    // array1.sort( function(a, b) {
    //     return a - b;  // for descending order just switch a and b as (b - a)
    // });
    console.log(array1);
}
sortArray();