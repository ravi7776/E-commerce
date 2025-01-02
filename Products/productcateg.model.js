var mongoose=require('mongoose');
const ProductCatg=mongoose.Schema({
    pcatgid:{type:Number},
    pcatgname:{type:String}
},{collection:"ProductCatg"})
module.exports=mongoose.model("ProductCatg",ProductCatg);