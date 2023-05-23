const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../models');
require('dotenv').config();

exports.protectRoute = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        // const refreshToken = await RefreshToken.findOne({ where: { userId } });
        const refreshToken = await RefreshToken.findOne({ where: { token } });
        if (!refreshToken || refreshToken.expiresAt < new Date()) {
            return res.status(401).json({  success:false,message: 'Unauthorized' });
        }
        req.token = token;
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message: error.message });
    }
};

exports.isLoggedIn = (req, res, next) => {
    // Check if user is authenticated
    if (req.headers.authorization) {
        return res.status(403).json({ message: 'Already logged in' });
    }
    next();
};


