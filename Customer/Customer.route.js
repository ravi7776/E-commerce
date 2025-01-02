 var express = require('express');
const customerRoute = express.Router();
const bodyparser = require('body-parser');
const Customer = require('./customer.model');
var fs = require('fs');
const multer = require('multer');


//Customer Registration Code
customerRoute.route('/register').post((req, res) => {
    var customer = new Customer(req.body);
    customer.save().then(customer => {
        if (customer != null) {
            res.send("Registration Succesfull");
            res.end();
        }
        else {
            res.send("Registration Failed");
            res.end();
        }
    }).catch(err => {
        res.send("Registration Failed");
        res.end();
    })
});

//get imaage
customerRoute.route('/getimage/:cpicname').get((req, res) => {
    res.sendFile('/Users/Dp218/Desktop/Main Project/Backend/Server-app/Customer/customerImage/' + req.params.cpicname);
});

//image save
const st = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/Users/Dp218/Desktop/Main Project/Backend/Server-app/Customer/customerImage/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: st });
customerRoute.post('/savecustomerimage', upload.single('file'), (req, res) => {
    res.json({});
})

//get customer count
customerRoute.route('/getcustomercount').get((req, res) => {
    Customer.find().then(customer => {
        res.send(customer);
        res.end();
    }).catch(err => {
        res.send(err);
        res.end();
    })
})

//login
customerRoute.route('/login').post((req, res) => {
    var id = req.body.CUserId;
    var pass = req.body.CUserPass;
    Customer.findOne({ $and: [{ "CUserId": id }, { "CUserPass": pass }] }).then(customer => {
        res.send(customer);
        res.end();
    }).catch(err => {
        res.send("Something went wrong");
        res.end();
    })
});

//get customer detail by id
customerRoute.route('/getcustomerdetails/:cid').get((req, res) => {
    console.log("cid="+req.params.cid)
    var id = req.params.cid;
    Customer.findOne({ 'Cid': id }).then(customer => {
        console.log(customer);
        res.send(customer);
        res.end();
    }).catch(err => {
        res.send("Something went wrong");
        res.end();
    })
});

//get customer list
customerRoute.route('/getcustomerlist').get((req, res) => {
    Customer.find().then(customer => {
        console.log(customer);
        res.send(customer);
        res.end();
    }).catch(err => {
        res.send("Something went wrong");
        res.end();
    })
});
module.exports = customerRoute;
