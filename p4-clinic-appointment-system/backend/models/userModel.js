const db = require('../config/db.js')

exports.findByEmail = async(email)=>{
    try{
        const qry = 'SELECT * FROM users WHERE email = ?';
    const result = await db.query(qry, [email]);
        return result[0] || null;
    }catch(err){
        console.log(err);
        throw err;
    }
}


exports.create = async(data)=>{
    try {
        const qry = 'INSERT INTO users (name, email, password) VALUES(?,?,?)';
        const result = await db.query(qry, [data.name, data.email, data.password]); 
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}