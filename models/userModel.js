
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const  userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name Needed"]
    },
    email:{
        type:String,
        required:[true,"email neede"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"password  Needed"],
     },
 

});
userSchema.pre('save',async function (next){
    if(!this.isModified('password'))return next;
this.password=await bcrypt.hash(this.password,12);
next();
})
const User=mongoose.model('users',userSchema);

module.exports=User;
