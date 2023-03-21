const example_controller = require("../controller/example_controller")
const abc = require("../controller/abc")
const carpark = require("../controller/carpark")
const mailtrap = require("../controller/mailtrap")
const credential = require("../controller/credential")
const express = require('express');
const router = express.Router();

///////////// credential////////////
router.get('/display_small', carpark.display_small)
router.get('/display_medium', carpark.display_medium)
router.get('/display_large', carpark.display_large)
router.get('/display_big', carpark.display_big)

router.post('/signup', credential.signup)
router.post('/create_user', abc.create_user)
router.post('/mailtrap', mailtrap.mailtrap)
router.post('/signin', abc.signin)
router.post('/update', abc.update)
// router.post('/update', abc.update)
router.post('/delete', abc.delete)
router.post('/get_data', abc.get_data)
router.get('/send', example_controller.sendEmail)
router.get('/query_example', example_controller.query_example)

module.exports = router
