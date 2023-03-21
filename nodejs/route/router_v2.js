const carpark = require("../controller/carpark")
const express = require('express');
const router = express.Router();

///////////// credential////////////
router.get('/display_small', carpark.display_small)
router.get('/display_medium', carpark.display_medium)
router.get('/display_large', carpark.display_large)
router.get('/display_big', carpark.display_big)



module.exports = router
