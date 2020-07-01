/* route file for users */

const express = require('express');
const router = express.Router();

// auth middleware
const auth = require('../middleware/auth');

// model
const User = require('../models/User');

/*  Desc - Registers a new user
 *  Method - POST
 *  Enpoint - api/v1/users/register
 */
router.post('/register', async (req, res, next) => {
    const {
        name,
        email,
        password
    } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields'
        });
    }

    // Check if user already exists
    let user = await User.findOne({
        email
    });

    if (user) {
        return res.status(400).json({
            success: true,
            message: 'User already exists with the same email'
        });
    }

    // create the user if it does not exist
    user = await User.create(req.body);

    // get the JWT token
    const token = user.generateJWTToken();

    // send response
    return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: user,
        token
    })

});

/*  Desc - Login a user
 *  Method - POST
 *  Enpoint - api/v1/users/login
 */
router.post('/login', async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields'
        });
    }

    // Check if user already exists
    let user = await User.findOne({
        email
    });

    // if the user not exists
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'User not registered for login. First register yourself!'
        });
    }

    // match the password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Passwords do not match'
        });
    }

    // get the JWT token
    const token = user.generateJWTToken();

    // send response
    return res.status(201).json({
        success: true,
        message: 'Login Successful',
        token
    });
});

/*  Desc - Get user data
 *  Method - POST
 *  Enpoint - api/v1/users/getMe
 *  Access - Private
 */
router.get('/me', auth, async (req, res, next) => {

    // find the user from DB
    const user = await User.findById(req.user.id);

    // send back the response
    res.status(200).json({
        success: true,
        data: user
    });
});


// export 
module.exports = router;