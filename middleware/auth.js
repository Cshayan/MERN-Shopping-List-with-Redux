const jwt = require('jsonwebtoken');

// User Model
const User = require('../models/User');

function auth(req, res, next) {

    // get the token from headers sent
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({
        success: false,
        message: 'No token found!'
    });

    try {
        // verify token and get the user
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
}

module.exports = auth;