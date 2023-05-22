const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User,Account,RefreshToken } = require('../models');
const { secret, jwtExpiration, jwtRefreshExpiration } = require('../config/auth.config');

exports.register = async (req, res) => {

    try {
        const { first_name, last_name, phone, address, email, password } = req.body;
        if(!first_name || !last_name || !phone || !address ||!email || !password){
            res.status(500).json({ message: 'pleas provide required fields' });
        }
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = await User.create({ first_name, last_name, phone, address, email });
        // Create associated account
        await Account.create({ user_id: newUser.id, password: hashedPassword });

        res.status(201).json({
            success:true,
            data:{
                user:newUser
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            res.status(500).json({ message: 'pleas provide required fields' });
        }

        // Find the user with the provided email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const account = await Account.findOne({ where: { user_id:user.id } });
        // Check if the provided password matches the stored hash
        const passwordMatch = await bcrypt.compare(password, account.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: jwtExpiration });
        //generate refToken
        // const refreshToken = jwt.sign({ userId: user.id }, secret, {
        //     expiresIn: jwtRefreshExpiration,
        // });

        let expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + jwtRefreshExpiration)
        await RefreshToken.create({
            token: token,
            userId: user.id,
            expiresAt: expiredAt.getTime()
        });
        res.status(200).json({
            success:true,
            data:{
                token:token,
                refreshToken:token,
                user:user
            }
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'Internal server error' });
    }
}

exports.logout = async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        await token.destroy({where:{userid:userId}})
        res.status(200).json({
            success:true,
            message: 'Logout successful'
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'Logout failed'
        });
    }
};