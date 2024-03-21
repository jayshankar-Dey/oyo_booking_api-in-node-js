const mongoose = require('mongoose')

const connectDB = async() => {
    mongoose.connect(process.env.DB_URI).then(() => {
        console.log(`database connection succesfully`.bgGreen);
    }).catch((error) => {
        console.log(`database connection failed error ${error}`.bgRed);
    });
}
module.exports = connectDB