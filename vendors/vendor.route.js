const express=require('express');
const vendorRoute=express.Router();
const bodyparser=require('body-parser');
const Vendor=require('./vendor.model');
var fs=require('fs');
const multer=require('multer');

//vendor registration code
vendorRoute.route('/register').post((req,res)=>{
    var vendor=new Vendor(req.body);
    console.log(req.body.Vendorname)
    vendor.save().then(vendor=>{
if(vendor!=null)
{
    res.send("Registration Succesfull");
}
else
{
    res.send("Registration Failed");
}
    }).catch(err=>{
        res.status(400).send("Registration Failed");
    })
})



//login 
vendorRoute.route('/login/:vuid/:vupass').get((req,res)=>{
    var id=req.params.vuid;
    var pass=req.params.vupass;
    Vendor.findOne({$and:[{"VUserId":id},{"VUserPass":pass},{"Status":"Inactive"}]}).then(vendor=>{
        res.send(vendor);
        res.end()
    }).catch(err=>{
        res.send("Something went wrong");
        res.end();
    })
})

//get image
vendorRoute.route('/getimage/:vpicname').get((req,res)=>{
res.sendFile("/Users/Dp218/Desktop/Main Project/Backend/Server-app/vendors/vendorImages/"+req.params.vpicname
);

})

//image save
const st=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"/Users/Dp218/Desktop/Main Project/Backend/Server-app/vendors/vendorImages/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
})
const upload=multer({storage:st});
vendorRoute.post('/savevendorimage',upload.single('file'),(req,res)=>{
    console.log("hello")
    res.json({})
})

//get vendor count
vendorRoute.route('/getvendorcount').get((req,res)=>{
    Vendor.find().then((vendor)=>{
    
        res.send(vendor);
        res.end();
    }).catch(err=>{
        res.send(err);
        res.end();
    })
})

//enable disable vender by admin
vendorRoute.route('/vendormanage/:vid/:status').put((req,res)=>{
    Vendor.updateOne({"Vid":req.params.vid},{"Status":req.params.status}).then(vendor=>{
        res.send("Vendor Status Updated succesfully");
        res.end();
    }).catch(err=>{
        res.send(err);
        res.end();
    })
})
module.exports=vendorRoute
