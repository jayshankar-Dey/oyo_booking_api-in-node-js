const colors = require('colors');
const express = require('express');
const morgan = require('morgan');
const core = require('cors');
const app = express()
const cookie_parser = require('cookie-parser');
const cloudinary = require('cloudinary');
const connectDB = require('./db/db');
const authrouter = require('./routes/auth.Router');
const Userouter = require('./routes/user.Router');
const Oyorouter = require('./routes/oyo.Router');
const Roomrouter = require('./routes/room.Router');
const likerouter = require('./routes/like.Router');
const Bookrouter = require('./routes/book.Router');
require('dotenv').config();


///middlewire//
app.use(core());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookie_parser());

connectDB();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.get('/', (req, res) => {
        res.send({
            message: "wellcome to oyo api"
        });
    })
    ///route//////////
app.use('/api/v1/auth', authrouter)
    //update user route
app.use('/api/v1/user', Userouter)

app.use('/api/v1/oyo', Oyorouter)
    ///
app.use('/api/v1/room', Roomrouter)

app.use('/api/v1/like', likerouter)

app.use('/api/v1/user', Bookrouter)

app.listen(process.env.PORT, () => {
    console.log(`server is starting on port http://localhost:${process.env.PORT}`.bgMagenta)
})