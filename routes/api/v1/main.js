const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/authController');
const {isLoggedIn,protectRoute} = require('../../../middlewares/authMiddleware')
const {isAdmin} = require("../../../middlewares/roleMiddleware");

let indexRouter = require('./index');
let authRouter = require('./auth');
let carsRouter = require('./cars');
let usersRouter = require('./users');
let rentalsRouter = require('./rentals');
let earningsRouter = require('./earnings');


router.use('/', indexRouter);
router.use('/auth', authRouter.router);
router.use('/admin/auth', authRouter.adminRouter);
router.use('/cars', carsRouter);
router.use('/customers', usersRouter);
router.use('/rentals', rentalsRouter);
router.use('/earnings',earningsRouter)


module.exports = router;