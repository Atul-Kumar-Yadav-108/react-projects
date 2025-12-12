const db = require("../config/db.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const apiError = require('../utils/apiError.js');

exports.resgisterUser = async(name, email, password)=>{
    const [existing] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if(existing.length > 0){
        throw new apiError(400, 'Email already exists');
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.query(
        'INSERT INTO users (name, email, password) VALUES(?,?,?)',
        [name, email, hashed]
    )
    return {name, email};
}



exports.loginUser = async (email, password) => {

    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?", 
        [email]
    );

    if (rows.length === 0) {
        throw new apiError(404, "User not found");
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new apiError(401, "Incorrect password");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { token, user: { id: user.id, name: user.name, email: user.email } };
};