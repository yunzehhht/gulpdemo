console.log("111");
new Promise( (resolve, reject)=> {
  setTimeout( () =>{
    resolve('ok');
  }, 1000);
});
console.log(11); //
 
console.log('x'.padStart(4, 'aaaaaaaa')) // 'abax'  