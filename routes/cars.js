var express = require('express');
var router = express.Router();
var carsController = require("../controllers/carsController")

/* GET cars listing. */
router.get('/',carsController.findAllCars)

module.exports = router;
