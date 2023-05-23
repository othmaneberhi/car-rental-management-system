const express = require('express');
const router = express.Router();
const carsController = require("../../../controllers/carsController")
const {protectRoute} = require('../../../middlewares/authMiddleware')

router.get('/',protectRoute,carsController.findAllCars) // /api/v1/cars
router.post('/',protectRoute,carsController.addCar) // /api/v1/cars
router.get('/available',protectRoute,carsController.findAvailableCars) // /api/v1/cars/available
router.get('/rented',protectRoute,carsController.findRentedCars) // /api/v1/cars/rented
router.get('/:id',protectRoute,carsController.findCarById) // /api/v1/cars/{id}
router.put('/:id',protectRoute,carsController.updateCar) // /api/v1/cars/{id}
router.delete('/:id',protectRoute,carsController.deleteCar) // /api/v1/cars/{id}
router.put('/:id/status',protectRoute,carsController.setCarStatus) // /api/v1/cars/{id}/status
router.get('/:id/rents',protectRoute,carsController.findCarRents) // /api/v1/cars/{id}/rents


module.exports = router;
