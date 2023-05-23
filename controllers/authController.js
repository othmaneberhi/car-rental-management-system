const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User,Account,RefreshToken } = require('../models');
const { secret, jwtExpiration, jwtRefreshExpiration } = require('../config/auth.config');

exports.register = async (req, res) => {

    try {
        const { first_name, last_name, phone, address, email, password } = req.body;
        if(!first_name || !last_name || !phone || !address ||!email || !password){
            return res.status(500).json({ message: 'pleas provide required fields' });
        }
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ paranoid: false,where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = await User.create({ first_name, last_name, phone, address, email });
        // Create associated account
        await Account.create({ user_id: newUser.id, password: hashedPassword });

        return res.status(201).json({
            success:true,
            data:{
                user:newUser
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(500).json({ message: 'pleas provide required fields' });
        }

        // Find the user with the provided email
        const user = await User.findOne({ where: { email },
            include: [
                {
                    model: Account,
                    as: 'Account',
                    attributes: ['isAdmin'],
                },
            ],
        });

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
        const token = jwt.sign({ userId: user.id, isAdmin: account.isAdmin }, secret, { expiresIn: jwtExpiration });
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
        return res.status(200).json({
            status:200,
            success:true,
            data:{
                token:token,
                refreshToken:token,
                user:user
            }
        });
    } catch (error) {
        return res.status(500).json({
            status:500,
            success:false,
            error:{
                code:error.code,
                message:error.message
            },
        });
    }
}

exports.logout = async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        await RefreshToken.destroy({where:{userid:userId}})
        return res.status(200).json({
            status:200,
            success:true,
            message: 'Logout successful'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:500,
            success:false,
            error:{
                error:error.code,
                message:error.message
            }
        });
    }
};

exports.getLoggedInUser = async (req,res) => {
    try{
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const refreshToken = await RefreshToken.findOne({ where: { token } });
        if (!refreshToken) {
            return res.status(401).json({  status:401, success:false,message: 'Unauthorized' });
        }
        if (refreshToken.expiresAt < new Date()) {
            return res.status(400).json({  status:400,success:false,message: 'Token expired' });
        }
        const userId = decoded.userId;
        const user = await User.findByPk(userId,{
            include:[
                {
                    model:Account,
                    attributes:['isAdmin']
                }
            ]
        })
        if(!user){
            return res.status(404).json({ status:404,success:false,message: 'User not found' });
        }
        return res.status(200).json({
            status:200,
            success:true,
            data:{
                user:user
            }
        });



    }catch (error) {
        console.log(error)
        return res.status(500).json({
            status:500,
            success:false,
            error:{
                error:error.code,
                message:error.message
            }
        });
    }
}
