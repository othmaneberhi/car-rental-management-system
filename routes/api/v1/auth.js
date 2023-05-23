const express = require('express');
const router = express.Router();
const adminRouter = express.Router();
const authController = require('../../../controllers/authController');
const {isLoggedIn,protectRoute} = require('../../../middlewares/authMiddleware')
const {isAdmin} = require("../../../middlewares/roleMiddleware");

adminRouter.use(isAdmin)

router.post('/register',isLoggedIn, authController.register); // api/v1/auth/register
router.post('/login',isLoggedIn, authController.login); // api/v1/auth/login
router.post('/logout',protectRoute, authController.logout); // api/v1/auth/logout
router.get('/user',protectRoute, authController.getLoggedInUser); // api/va/auth/user

adminRouter.get('/test',isAdmin,protectRoute, (req,res)=>{
    return res.status(200).json({
        message:'hello admin'
    })
});

module.exports = {
    router,
    adminRouter
};