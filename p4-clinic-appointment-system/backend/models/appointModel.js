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

exports.getByUser = async(userId, search) => {
  
  try{
        const result = await db.query(
      "SELECT * FROM appointments WHERE userId = ? AND (doctor LIKE  ? OR date LIKE ? OR symptoms LIKE ? ) ORDER BY id DESC",
      [userId, `%${search}%`, `%${search}%`, `%${search}%`])
      return result[0] || null;
  }catch(error){
    console.log(error);
    throw error;
  }

};