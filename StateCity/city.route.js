const express=require('express');
const cityRoute=express.Router();
var City=require('./city.model');

//save state
cityRoute.route('/save/').post((req,res)=>{
    let city=new City(req.body); 
    city.save().then(city=>{
        res.send("City Saved");
        res.end();
    }).catch(err=>{
        res.send("Unable to save to database");
        res.end();
    })
})

// //get city by state id

cityRoute.route('/getcitybystid/:stid').get((req,res)=>{
    City.find({"stid":req.params.stid}).then(city=>{
           
            res.send(city);
            console.log(city);
            res.end();
        }).catch(err=>{
        res.send(err);
        res.end();
    })
})

// //update city

// cityRoute.route('/updateCity/').put((req,res)=>{
//     var city=new City(req.body);
//     City.updateOne({'ctid':city.ctid},{'ctname':city.ctname}).then((res)=>{
//         res.send("City Name Updated");
//         res.end();
//     }).catch((err)=>{
//         res.send("Cannot able to Update City");
//         res.end();
//     })
// })

// //delete City

cityRoute.route('/deletecity/:ctid').delete((req,res)=>{
    City.deleteOne({'ctid':req.params.ctid}).then(()=>{
        res.send("Product Deleted from Database");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    })
})





//show all city
cityRoute.route('/show').get((req,res)=>{
    City.find().then((city)=>{
        res.send(city);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    })
})

module.exports=cityRoute