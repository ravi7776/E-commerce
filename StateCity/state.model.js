var mongoose=require('mongoose');
const Schema=mongoose.Schema;

const State=new Schema({
    stid:{type:Number},
    stname:{type:String}
},{
    collection:"State"
});

module.exports=mongoose.model("State",State);