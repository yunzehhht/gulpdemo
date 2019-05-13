// console.log("111");
// new Promise( (resolve, reject)=> {
//   setTimeout( () =>{
//     resolve('ok');
//   }, 1000);
// });
// console.log(11); //
var obj = {}
Object.defineProperty(obj, 'newKey', {
  configurable:true | false,
  enumerable:true | false,
  value:'123123',
  writable:true | false
})
console.log(obj.newKey)