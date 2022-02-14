
const mongoose = require("mongoose");
const { ObjectID } = require("bson");

const  protifloSchema =new mongoose.Schema({
    user_id:{
        type:ObjectID,
        required:[true,"user_id Needed"]
    },     covers_img:{
        type:String,
        required:[true,"covers_img Needed"]
    },     profile_img
    :{
        type:String,
        required:[true,"profile_img Needed"]
    },    About:{
        type:String,
        required:[true,"About Needed"]
    },     Bio:{
        type:String,
        required:[true,"Bio Needed"]
    },    Edu:{
        type:String,
        required:[true,"Edu Needed"]
    },     hobbies:{
        type:String,
        required:[true,"hobbies Needed"]
    }, skils:{
        type:String,
        required:[true,"skils Needed"]
    }, 

});
 
const Portofilo=mongoose.model('projects',protifloSchema);

module.exports=Portofilo;
