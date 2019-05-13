
console.log(11)
var str:string = '你好';

const flag:number = 123;        
const arr = [];

function fun(name:string,age:number|string):string{
    return `姓名：${name} -----年龄：${age}`
} 
 
class Person{ 
    public name:string 
    constructor(name:string){
        this.name = name;
    }
}


function getData<S>(value:S):any{  
    return value;
}

getData<string>("123");