const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {restrictLoginAccess,protectRoute} = require('../middlewares/authMiddleware')
// Route for user registration
router.post('/register',restrictLoginAccess, authController.register);
router.post('/login',restrictLoginAccess, authController.login);
router.post('/logout',protectRoute, authController.logout);

module.exports = router;