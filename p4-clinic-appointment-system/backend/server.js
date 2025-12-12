const path = require("path");
require('dotenv').config({path: path.resolve(__dirname, '.env')});

const express = require('express');
const cors = require('cors');
const authRoute = require("./routes/authRoute.js");
const appointmentRoute = require("././routes/appointmentRoute.js")
const errorMiddleware = require('./middlewares/error.middleware.js');


//
const app = express();

// middlewares
app.use(cors({
      origin: "http://localhost:5173",
    credentials: true   // 👈 MOST IMPORTANT
}));
app.use(express.json());

function test(req, res, next) {
  console.log("Middleware chala");
  next();
}

// port
const PORT = process.env.PORT || 5000;

// routes
app.use('/api/auth',authRoute);
app.use('/api/appointment',appointmentRoute);

// app.get('/',(req, res)=>{
//     console.log("Welcome to clinic portal")
//     res.send("Welcome to clinic portal");
// })




// global error handler (always last middleware)
app.use(errorMiddleware);

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})