const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {isLoggedIn,protectRoute} = require('../middlewares/authMiddleware')

router.post('/register',isLoggedIn, authController.register);
router.post('/login',isLoggedIn, authController.login);
router.post('/logout',protectRoute, authController.logout);

module.exports = router;