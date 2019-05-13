interface DBI<T>{
    add(Info:T):boolean;
    update(Info:T):boolean;
    delete(id:number):boolean;
    get(id:number):boolean;
}

class mySqlDb<T>  implements DBI<T>{
    add(Info: T): boolean {
        throw new Error("Method not implemented.");
    }   
     update(Info: T): boolean {
        throw new Error("Method not implemented.");
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }
    get(id: number): boolean {
        throw new Error("Method not implemented.");
    }

}  


let logs =(params: any)=>{
    console.log(params) 
    console.log(1111)
}

    

@logs 
class HttpServer {
    constructor(){
 
    }
    getUrl(){
        
    }
}
let a =  new HttpServer();
console.log(222)