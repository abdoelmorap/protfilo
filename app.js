const Express = require("express");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const  dotenv=require("dotenv");
const  mrouteres=require("./router/routes")
//loaad config
dotenv.config();
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.listen(8080, () => {});

//connect database
(async ()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/protofilo", { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true });
})();
 app.use('/api', mrouteres);