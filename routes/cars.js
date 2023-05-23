const express = require('express');
const router = express.Router();
const carsController = require("../controllers/carsController")
const {protectRoute} = require('../middlewares/authMiddleware')

/* GET cars listing. */
router.get('/',protectRoute,carsController.findAllCars)
router.post('/add',protectRoute,carsController.addCar)
router.get('/available',protectRoute,carsController.findAvailableCars)
router.get('/rented',protectRoute,carsController.findRentedCars)
router.get('/:id',protectRoute,carsController.findCarById)
router.put('/:id',protectRoute,carsController.updateCar)
router.delete('/:id',protectRoute,carsController.deleteCar)
router.put('/:id/status',protectRoute,carsController.setCarStatus)
router.get('/:id/rents',protectRoute,carsController.findCarRents)


module.exports = router;
