const express=require('express');
const paymentdetailsRoute=express.Router();
const PaymentDetails=require('./paymentdetail.model');

//save payment details
paymentdetailsRoute.route('/paymentdetailsave').post((req,res)=>{
    let paydetail=new PaymentDetails(req.body);
    paydetail.save().then(data=>{
        res.send("Payment Succesfull");
        res.end();
    }).catch(err=>{
        res.send(err);
        res.end();
    })
})

//get payment details
paymentdetailsRoute.route('/showpaymentdetail').get((req,res)=>{
    PaymentDetails.find().then((res)=>{
        res.send(res);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    })
})

//get payment deatl by bill id
paymentdetailsRoute.route('/showpaymentdetailbyid/:billid').get((req,res)=>{
    PaymentDetails.findOne({"billid":req.params.billid}).then(pd=>{
        res.send(pd);
        res.end();
    }).catch(err=>{
        res.send(err)
        res.end();
    })
})

module.exports=paymentdetailsRoute