//create HTTP server
// import express module
import exp from 'express';
import {userApp} from "./APIs/UserApi.js"
import {productApp} from "./APIs/ProductApi.js"

//create server
const app=exp();
//assign port number 
app.listen(3000,()=>console.log('HTTP server listening in port 3000..'));

//body parser middleware
app.use(exp.json());//to parse json data from request body
app.use('/user-api',userApp)
app.use('/product-api',productApp)

