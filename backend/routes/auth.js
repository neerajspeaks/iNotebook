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
    let success = true;
    //If There are errors, return bad request along with errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ errors: errors.array() });
    }

    //Using becryptjs to hashify/encrypt password using salt/pepper.
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);
    //Check whether or not user with same email exists already.
    try {
        
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json(success + "Sorry a user with this email already exists.");
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
            return res.status(200).json({ success, authToken });
        }
    } catch (error) {
        success = false;
        console.log(error);
        return res.status(500).send(success + "Internal server error.");
    }

});

//Route 2 : Authenticate a user using : POST "/api/auth/login, No login required".

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank.').exists(),
], async (req, res) => {
    try {
        let success = true;
        //If There are errors, return bad request along with errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({ success, errors: errors.array() });
        }
        const { email, password } = req.body;

        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Sorry, Please try to login with correct credentials!" });
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            success = false;
            return res.status(400).json({ success, error: "Sorry, Please try to login with correct credentials!" });
        }
        const data = {
            user: {
                id: user.id
            }
        }

        let name = user.name;
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.status(200).json({ success, authToken, name});
    } catch (error) {
        success = false;
        console.log(error);
        res.status(500).send(success + "Internal server error");
    }
});

//Route 3 : Get details of logged in user : POST "/api/auth/getuser : Login required.".

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let success = true;
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json(success, user);
    } catch (error) {
        success = false;
        console.log(error.message);
        return res.status(500).json(success, "Internal server error");
    }
});


module.exports = router;