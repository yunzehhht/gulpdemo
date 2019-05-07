"use strict";

console.log("111");
new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('ok');
  }, 1000);
});
console.log(11); //