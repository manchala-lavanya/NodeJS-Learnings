let id1 = setInterval(() => {
  console.log('1')
}, 1000);

let id2 = setInterval(() => {
  console.log('2')
}, 1000);   

  console.log('3')

setTimeout(() => {
    clearInterval(id1);
    clearInterval(id2);
    console.log("Stopped both intervals");
}, 5000);
