const express = require('express');
const router = express.Router();
const usersController = require("../../../controllers/usersController")
const {protectRoute} = require('../../../middlewares/authMiddleware')

router.get('/',protectRoute,usersController.findAllUsers) // /api/v1/customers/
router.get('/:id',protectRoute,usersController.findUserById) // /api/v1/customers/{id}
router.delete('/:id',protectRoute,usersController.deleteUser) // /api/v1/customers/{id}
router.put('/:id',protectRoute,usersController.updateUser) // /api/v1/customers/{id}
router.get('/:id/rents',protectRoute,usersController.findUserRents) // /api/v1/customers/{id}/rents


// Export the router
module.exports = router;
