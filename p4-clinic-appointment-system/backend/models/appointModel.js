const db = require('../config/db.js');


exports.create = async(data)=>{
    try {
        const qry = "INSERT INTO appointments (userID, doctor, date, time, symptoms) VALUE(?,?,?,?,?)";
        const appointment = await db.query(qry, [data.userID, data.doctor, data.date, data.time, data.symptoms]); 
        return appointment[0] || null;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

exports.getByUser = async(userId) => {
  
  try{
        const result = await db.query(
      "SELECT * FROM appointments WHERE userId = ? ORDER BY id DESC",
      [userId])
      return result[0] || null;
  }catch(error){
    console.log(error);
    throw error;
  }

};