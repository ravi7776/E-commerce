const express=require('express');
const app=express();
var cors=require('cors');
var bodyParser=require('body-parser');
const mongoose=require('mongoose');
const config=require('./DB');
const ProductCatg=require('./Products/productcatg.route');
const StateRoute=require('./StateCity/state.route');
const CityRoute=require('./StateCity/city.route');
const PORT=7676;
const productRoute=require('./Products/product.route');
const vendorRoute=require('./vendors/vendor.route')
const CustomerRoute=require('./Customer/Customer.route');
const billRoute=require('./admin/Bills/bill.route')
const paymentDetails=require('./admin/Bills/payment');
const paymentdetailsRoute=require("./admin/Bills/paymentdetails.route");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/productcatg',ProductCatg);
app.use('/city',CityRoute);
app.use('/state',StateRoute);
app.use('/product',productRoute)
app.use('/vendor',vendorRoute);
app.use('/customer',CustomerRoute);
app.use('/bill',billRoute);
app.use('/payment',paymentDetails);
app.use("/paymentdetails",paymentdetailsRoute);

mongoose.connect(config.url,{useNewUrlParser:true}).then(()=>{
    console.log('connected to database'+config.url);
}),err=>{
    console.log('error in connecti cxng to database'+err);
}

app.listen(PORT,()=>{
    console.log('server is running on port'+PORT);
})
