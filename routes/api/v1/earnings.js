const express = require('express');
const router = express.Router();
const earningsController = require("../../../controllers/earningsController")
const {protectRoute} = require('../../../middlewares/authMiddleware')

router.get('/',protectRoute,earningsController.getEarnings) // /api/v1/earnings

module.exports = router;
