const app = require('./src/app.js');

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on Mode: ${process.env.NODE_ENV} on the port ${PORT}`);
})