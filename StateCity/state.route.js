const express=require('express');
const stateRoute=express.Router();
var State=require('./state.model');

//save route
stateRoute.route('/save').post((req,res)=>{
    let state=new State(req.body);
    state.save().then(state=>{
        res.send("State Saved");
        res.end();
    }).catch(err=>{
        res.send("unable to save to Database");
    })
})

//show all states
stateRoute.route('/show').get((req,res)=>{
    State.find().then((state)=>{
        res.send(state);
        res.end();
    }).catch((err)=>{
        res.send(err)
        res.end();
    })
})

//update State
stateRoute.route('/updatestate/').put((req,res)=>{
    var state=new State(req.body);
    state.updateOne({'stid':req.body.stid},{'stname':req.body.stname}).then(state=>{
        res.send("State Name updated in databse");
        res.end();
    }).catch(err=>{
        res.send("Data Not found somethinf went wrong");
        res.end();
    })
})

//delete state
stateRoute.route('/deletestate/').delete((req,res)=>{
    var state=new State(req.body);
    state.deleteOne({'stid':req.body.stid}).then(res=>{
        res.send("State deleted from Database");
        res.end();
    }).catch(err=>{
      res.send("Cannot be able to delete State");
      res.end();
    })
})

module.exports=stateRoute