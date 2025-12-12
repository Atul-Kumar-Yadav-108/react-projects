const router = require('express').Router();
const {requireSignin} = require("../middlewares/authMiddleware.js");
const {createAppointment, getMyAppointment} = require("../controllers/appointmentController.js");

router.post('/create',requireSignin, createAppointment);
router.get('/myappointments', requireSignin, getMyAppointment);

module.exports = router;