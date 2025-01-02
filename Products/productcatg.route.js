const express=require('express');
const productcatgRoute=express.Router();
var ProductCatg=require('./productcateg.model');
const mongoose=require('mongoose');


productcatgRoute.route('/addprodductcatg/:pcatgid/:pcatgname').post((req,res)=>{
    var productcatg=new ProductCatg({pcatgid:req.params.pcatgid,pcatgname:req.params.pcatgname});

    productcatg.save().then(productcatg=>{
        res.send("product category added succesfully");
        res.end();
    }).catch((err)=>{
        res.send("error in adding product category");
        res.end();
    })
})


//get all product category

productcatgRoute.route('/showproductcatg').get((req,res)=>{
    ProductCatg.find().then((productcatg)=>{
        res.send(productcatg);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    })
})

//search product already exist with same name or not
productcatgRoute.route('/searchproductcatg/:pcatgname').get((req,res)=>{
     ProductCatg.FindOne({"pcatgname":req.params.pcatgname}).then(ProductCatg=>{
           
            res.send(ProductCatg);
            res.end();
        }).catch((err)=>{
        res.send("Cannot be able to find product name");
        res.end();
    })
})

//delete product
productcatgRoute.route('/deleteproductcatg/:pcatgname').delete((req,res)=>{
    ProductCatg.deleteOne({"pcatgname":req.params.pcatgname}).then((ProductCatg)=>{
        if(ProductCatg.deletedCount>0)
        {
            res.send("product deleted");
            res.end();
        }
        else
        {
            res.send("Cannot be able to delete Product");
        }
    }).catch((err)=>{
        res.send(err);
        res.end();
    })
})

module.exports=productcatgRoute