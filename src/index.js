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
//同步代码
// import moduleA from "./moduleA.js"
// console.log("module A name is ",moduleA.name)
import "./lib_modules/test-module"
import "./lib_modules/test-module2"
import echarts from "echarts"
console.log("echarts",echarts)
//异步代码分割
let button=document.getElementById("button")
button.addEventListener("click",()=>{
    let div=document.createElement("div")
    div.className="index"
    document.body.appendChild(div)
    import(/*webpackChunkName:"async",webpackPrefetch:true*/"./async").then(res=>{
        console.log(res)
    })
    import(/*webpackChunkName:"asyncTwo",webpackPrefetch:true*/"./async-two").then(res=>{
        console.log(res)
    })
    // import(/*webpackChunkName:"test",webpackPrefetch:true*/"./test").then(res=>{
    //     console.log(res)
    // })
});

