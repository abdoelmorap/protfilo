const Express = require("express");
const app =Express;
const mongoose = require("mongoose");

const User=require('../models/userModel');
const Projects=require('../models/projects');
const router =app.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
router.post('/register', async function(req, res) {
 
    await User.create({
         password: req.body.password,
            name: req.body.name,
            email: req.body.email,
        },
        function (err, user) {
            if (err) return res.status(500).send({ auth: "false", msg:"There was a problem registering the user."+err})
            // create a token
            const token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({auth: "true", token: token,email:user.email});
        });
});
router.get('/me', function(req, res) {
    var token = req.headers['x-access-token'];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.findById(decoded.id, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.status(200).send(user);
        });
    });
});
router.post('/login', function(req, res) {
console.log(req.body.password);
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send({ auth: "false", token: null,msg: 'No user found.'});

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: "false", token: null ,msg: 'Password is wrong.'});

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: "true", token: token ,email:user.email});
    });

});
// AuthController.js
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

router.get('/getprtofilo', function(req, res) {
    User.aggregate([{
        $lookup: {
            from:"Portfolios",
            localField:"_id",
            foreignField:"user_id",
            as:"users_Portfolios"
        } 
    }]).exec(function(err, data) {
        res.status(200).send(data);
        // students contain WorksnapsTimeEntries
    });
    
   
  

});

router.get('/getprojects', function(req, res) { 
console.log(mongoose.Types.ObjectId(req.query.id));
    Projects.aggregate([   
        
        
        { "$match": { "protfilo_id":  mongoose.Types.ObjectId(req.query.id) }  } ,
    {
        $lookup: {
            from:"gallery",
            localField:"_id",
            foreignField:"project_id",
            as:"gallery"
        }  
    }
])
.exec(function(err, data) {
        res.status(200).send(data);
        // students contain WorksnapsTimeEntries
    });
    
   
  

});




module.exports=router;

