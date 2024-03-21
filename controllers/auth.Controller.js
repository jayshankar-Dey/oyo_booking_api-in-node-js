const Users = require("../model/User.model");
const jwt = require('jsonwebtoken')
const registerController = async(req, res) => {
        try {
            const user = await Users.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ message: "user alredy exist" })
            }
            await Users.create({...req.body })
            res.status(200).json({
                success: true,
                message: "User register succesfully"
            });

        } catch (error) {
            console.log(`error in register controller ${error}`.bgRed);
            if (error.name === "ValidationError") {
                return res.status(400).json({
                    success: false,
                    message: "please provide allfield"
                })
            }
            return res.status(404).json({
                success: false,
                message: "Register failed",
                error
            });
        }
    }
    //login controller
const loginController = async(req, res) => {
        try {
            const user = await Users.findOne({ email: req.body.email })
            if (!user) return res.status(400).json({ success: false, message: "Unauthorised user" })
            const token = await user.generateToken()
            const match = await user.comparePassword(req.body.password);
            if (!match) return res.status(400).json({ success: false, message: "Unauthorised user" })

            res.status(200).cookie("token", token, {
                expires: new Date(Date.now() + 24 * 2000000),
                httpOnly: true,
                secure: true
            }).json({
                success: true,
                message: "User login succesfully",
                user,
                token
            });

        } catch (error) {
            console.log(`error in login controller ${error}`.bgRed);
            return res.status(404).json({
                success: false,
                message: "login failed",
                error
            });
        }
    }
    //reset password by sending email
const reset_password_by_sending_email = async(req, res) => {
        try {
            const { email } = req.body;
            if (!email) res.status(400).send({ message: "please enter email" })
            const user = await Users.findOne({ email: email })
            if (!user) res.status(400).send({ message: "valid email" })
            const secret = user._id + process.env.JWT_SECRET;
            const token = jwt.sign({ _id: user._id }, secret, {
                expiresIn: "15m"
            })
            const link = `http://localhost:3000/reset/password/${user._id}/${token}`
            res.status(200).send({
                success: true,
                message: "email send succesfully",
                link
            })
        } catch (error) {
            console.log(`error in reset password controller ${error}`.bgRed);
            return res.status(404).json({
                success: false,
                message: "reset controller failed",
                error
            });
        }
    }
    //reset password
const resetPassword_Controller = async(req, res) => {
        try {
            const { id, token } = req.params;
            const { password, cnfpassword } = req.body
            if (!password || !cnfpassword) res.status(400).send({ success: false, message: "all fields are required" });
            if (password !== cnfpassword) res.status(400).send({ success: false, message: "password and conferm password are not metch" });
            const user = await Users.findById(id)
            if (user) {
                const secret = user._id + process.env.JWT_SECRET
                const { _id } = jwt.verify(token, secret)
                if (_id) {
                    user.password = password
                    await user.save()
                    res.status(200).send({
                        success: true,
                        message: "password reset succesfully",
                        user
                    })
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: "user not found",
                })
            }

        } catch (error) {
            console.log(`error in reset password controller ${error}`.bgRed);
            if (error.name == "TokenExpiredError") {
                return res.status(404).json({
                    success: false,
                    message: "Link is expire please resend",
                });
            }
            return res.status(404).json({
                success: false,
                message: "reset controller failed",
                error
            });
        }
    }
    //export
module.exports = {
    registerController,
    loginController,
    reset_password_by_sending_email,
    resetPassword_Controller
}