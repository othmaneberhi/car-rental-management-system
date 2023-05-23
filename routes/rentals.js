const express = require('express');
const router = express.Router();
const rentalsController = require("../controllers/rentalsController")
const {protectRoute} = require('../middlewares/authMiddleware')

router.get('/',protectRoute,rentalsController.findAllRentals) // /api/v1/rentals
router.get('/:id',protectRoute,rentalsController.findRentalById) // /api/v1/rentals/{id}
router.get('/pending',protectRoute,rentalsController.findPendingRentals) // /api/v1/rentals/pending
router.get('/confirmed',protectRoute,rentalsController.findConfirmedRentals) // /api/v1/rentals/confirmed
router.post('/',protectRoute,rentalsController.addRental) // /api/v1/rentals
router.put('/:id/status',protectRoute,rentalsController.setStatus) // /api/v1/rentals/{id}/status



module.exports = router;
