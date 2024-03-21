const jwt = require('jsonwebtoken')
const User = require('../model/User.model')
const isauth = async(req, res, next) => {
    try {
        const { token } = req.cookies;
        if (token) {
            const { _id } = await jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(_id)
            next()
        }
    } catch (error) {
        console.log(`error in auth  middlewire ${error}`.bgRed);
        res.status(400).json({
            success: false,
            message: "Unauthorize user"
        });
    }
}
module.exports = isauth