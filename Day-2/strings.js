// const s1 = new String("Ram");
const s2 = new String("Ram");
s2.concat(" Kumar");
const s3 = `Ram ${lastName}`;
const URL = new URL("https://example.com"); 

console.log(s3 === s2); // checks reference equality
console.log(s3 == s2); // checks the value only, not the reference
console.log(typeof s3); // string
console.log(typeof s2); // object
