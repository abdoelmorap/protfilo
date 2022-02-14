
const mongoose = require("mongoose");
const { ObjectID } = require("bson");

const  gallerySchema =new mongoose.Schema({
    alt:{
        type:String,
        required:[true,"alt Needed"]
    }, 
    project_id:{
        type:ObjectID,
        required:[true,"project_id Needed"]
    },     url:{
        type:String,
        required:[true,"url Needed"]
    },     type:{
        type:String,
        required:[true,"type Needed"]
    }, 

});
 
const Gallery=mongoose.model('projects',gallerySchema);

module.exports=Gallery;
