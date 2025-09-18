let n=5;

for(let i=n; i>=1; i--) //loop for rows
{ 
    let str = "";     
    for(let j=1; j<=i; j++){ //loop for stars in each row
        str += "*";
    }       
    console.log(str);
}

let m=5;
for (let i=m; i>=1; i--){ //loop for rows
    console.log("*".repeat(i)); //string repeat function
}

function printReversePyramid(n) {
    for(let i=n; i>=1; i--) {
        console.log('*'.repeat(i)); //optimized approach
    }   
}