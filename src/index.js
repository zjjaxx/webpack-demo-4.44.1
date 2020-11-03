// css test
import "./index.css"
//less test
import "./index.less"
//img test
import imgPath from  "./imgs/logo.jpg"
console.log("imgPath",imgPath)
//es test
const _promise=new Promise((resolve,reject)=>{
    resolve(10)
}).then(res=>{
    console.log("result is ",res)
})
import moduleA from "./moduleA.js"

console.log("module A name is ",moduleA.name)