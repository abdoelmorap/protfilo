const userRoutes =require('../controllers/userController');
// wiki.js - Wiki route module.

const express = require('express');
const router = express.Router();


// About page route.
router.use('/Users',  userRoutes)

module.exports = router;