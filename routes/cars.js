var express = require('express');
var router = express.Router();
var carsController = require("../controllers/carsController")
const {protectRoute} = require('../middlewares/authMiddleware')

/* GET cars listing. */
router.get('/',protectRoute,carsController.findAllCars)

module.exports = router;
