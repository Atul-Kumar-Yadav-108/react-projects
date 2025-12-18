const appointmentModel = require('../models/appointModel.js');

exports.createAppointment = async(req, res)=>{
    try {
        const {doctor, date, time, symptoms } = req.body;

        if(!doctor || !date || !time){
            return res.status(400).send({success :false, message : 'All fields are required.'});
        }

        await appointmentModel.create({
            userID: req.user.id,
            doctor,
            date,
            time,
            symptoms
        });

        res.status(200).send({success : true, message : "Appointment booked successfully."});

    } catch (error) {
        res.status(401).send({success : false, message : error.message});
    }
}


exports.getMyAppointment = async(req, res)=>{
    try {const search = req.query.search || '';
        const data = await appointmentModel.getByUser(req.user.id, search);
        res.status(200).send({success : true, message : 'Fetched all appointments', counts : data.length
            , appointments : data})
    } catch (error) {
        res.status(401).send({success :false , message : error.message});
    }
}