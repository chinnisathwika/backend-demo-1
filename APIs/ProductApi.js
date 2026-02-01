import express from 'express';
export const productApp=express();

let products=[];
//create a Product API
productApp.get("/products",(req,res)=>{
    res.status(200).json({message:"all products",payload:products});
});
productApp.get("/products-brand/:brand",(req,res)=>{
    let brand=req.params.brand;
    let filteredProducts=products.filter((product)=>product.brand===brand);
    res.status(200).json({message:"all products of brand"});
});
productApp.post("/products",(req,res)=>{
    let newProduct=req.body
    products.push(newProduct);
    res.status(201).json({message:"product created"})
});
productApp.put("/products/:id",(req,res)=>{
    let modifiedProduct=req.body;
    let id = Number(req.params.id);
    let index=products.findIndex((product)=>product.id==id);
    if(index===-1){
        return res.status(404).json({message:"product not found"});
    }
    modifiedProduct.id = id; //endure id remains consistent
    let deletedProduct=products.splice(index,1,modifiedProduct)
    res.status(200).json({message:"product modified"});
});
productApp.get('/products-id/:id',(req,res)=>{
    let id=Number(req.params.id)
    let product=products.find((productObj)=>productObj.id===id)
    if(!product){
        return res.status(404).json({message:"product not found"});
    }
    res.status(200).json({message:"product found",payload:product});
});
productApp.delete("/products/:id",(req,res)=>{
    let id=Number(req.params.id);
    let index=products.findIndex((product)=>product.id===id);
    if(index==-1){
        return res.status(404).json({message:"user not found"});
    }
    let deletedProduct=products.splice(index,1);
    res.status(200).json({message:"Product deleted",payload:deletedProduct});
});
