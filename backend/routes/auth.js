const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser'); 


const JWT_SECRET = 'NKSSIGNEDTOKEN$';

//Route 1 : Create a User using : POST request '/api/auth/createuser'. No login(auth) required.
router.post('/createuser', [
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('password', 'Invalid Password').isLength({ min: 5 }),

], async (req, res) => {
    //If There are errors, return bad request along with errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Using becryptjs to hashify/encrypt password using salt/pepper.
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);
    //Check whether or not user with same email exists already.
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json("Sorry a user with this email already exists.");
        } else {
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error.");
    }

});

//Route 2 : Authenticate a user using : POST "/api/auth/login, No login required".

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank.').exists(),
], async (req, res) => {
    //If There are errors, return bad request along with errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({ error: "Sorry, Please try to login with correct credentials!" });
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            res.status(400).json({ error: "Sorry, Please try to login with correct credentials!" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

//Route 3 : Get details of logged in user : POST "/api/auth/getuser : Login required.".

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});


module.exports = router;