const Express = require("express");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const  dotenv=require("dotenv");
const  mrouteres=require("./router/routes");
const cors = require("cors");

//loaad config
dotenv.config();
var app = Express(); 

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server listening on port " + port);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  });
  
  app.use(cors());

//connect database
(async ()=>{
    await mongoose.connect(process.env.LiveMonogoDB, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true });
})();
 app.use('/api', mrouteres);