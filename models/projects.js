
const mongoose = require("mongoose");
const { ObjectID } = require("bson");

const  projectsSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name Needed"]
    }, 
    protfilo_id:{
        type:ObjectID,
        required:[true,"protfilo_id Needed"]
    },     long_discribtion:{
        type:String,
        required:[true,"long_discribtion Needed"]
    },     short_discribtion:{
        type:String,
        required:[true,"short_discribtion Needed"]
    }, 

});
 
const Projects=mongoose.model('projects',projectsSchema);

module.exports=Projects;
