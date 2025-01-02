var express=require('express');
const productRoute=express.Router();
    let Product=require('./product.model');
const multer=require('multer');

productRoute.route('/saveproduct').post((req,res)=>{
    let product=new Product(req.body);
    product.save().then(product=>{
        res.send('product added successfully');
        res.end();
    }).catch(err=>{
        res.send(err);
        res.end();
    })
})
//get product all
productRoute.route('/showproduct').get(function(req,res){
    Product.find().then(product=>{
res.send(product);
res.end();
    }).catch(err=>{
        res.status(400).send("Data Not found something went wrong");
    });
});
//get product count
productRoute.route('/getmaxpid').get(function(req,res){
Product.find().then(product=>{
    res.send(product);
    res.end();
}).catch(err=>{
    res.status(400).send("Data Not found something went wrong");
})
})
//save product image
const stv=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"/Users/Dp218/Desktop/Main Project/Backend/Server-app/Products/productImages/")
    },
    filename:(req,file,cb)=>{
cb(null,file.originalname)
    },
})

const uploadv=multer({storage:stv});
productRoute.post('/saveproductimage',uploadv.single('file'),(req,res)=>{
    res.send("Upload Success");
    res.end();
});

//get product image
productRoute.route('/getproductimage/:picname').get((req,res)=>{
    res.sendFile('/Users/Dp218/Desktop/Main Project/Backend/Server-app/Products/productImages/'+req.params.picname);
});



//get product vendor
productRoute.route('/showproductbyvendor/:vid').get(function(req,res){
    Product.find({vendor:req.params.vid}).then(product=>{
        res.send(product);
        res.end();
    }).catch(err=>{
        res.status(400).send("Data Not found something went wrong");
    })
})

//get product by category
productRoute.route('/showproductbycategory/:pcatgid').get(function(req,res){
Product.find({"pcatgid":req.params.pcatgid}).then(product=>{
    res.send(product);
    res.end();
}).catch(err=>{
    res.send(err);
})
})
module.exports=productRoute

