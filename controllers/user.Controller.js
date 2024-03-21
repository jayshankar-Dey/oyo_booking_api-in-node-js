const getFile = require("../config/getFile");
const User = require('../model/User.model')
const cloudinary = require('cloudinary')
const UpdateProfile_Pic_Controller = async(req, res) => {
        try {
            const file = getFile(req.file);
            if (file) {
                const user = await User.findById(req.user._id)
                await cloudinary.v2.uploader.destroy(user.profile.public_id)
                const cdb = await cloudinary.v2.uploader.upload(file.content)
                user.profile = {
                    public_id: cdb.public_id,
                    url: cdb.secure_url
                }
                await user.save()
                res.status(200).json({
                    success: true,
                    message: "profile update succesfully",
                    user
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "please enter image"
                })
            }
        } catch (error) {
            console.log(`error in update profile pic controller ${error}`)
            res.status(400).json({
                success: false,
                message: "Update profile pic failed",
                error
            });
        }
    }
    //update user
const Update_user_controller = async(req, res) => {
        try {
            const { name, phone, address } = req.body;
            const user = await User.findById(req.user._id);
            if (name) user.name = name;
            if (phone) user.phone = phone;
            if (address) user.address = address;
            await user.save()

            return res.status(200).json({
                success: true,
                message: "user update succes fully",
                user
            })

        } catch (error) {
            console.log(`error in update user controller ${error}`)
            res.status(400).json({
                success: false,
                message: "Update user failed",
                error
            });
        }
    }
    ///change password
const change_password_controller = async(req, res) => {
    try {
        const { password, newpassword } = req.body;
        if (!password) res.send({ message: "please enter oldpassword" });
        if (!newpassword) res.send({ message: "please enter newpassword" })

        const user = await User.findById(req.user._id)
        const ismetch = await user.comparePassword(password)
        if (ismetch) {
            user.password = newpassword;
            await user.save();
            return res.status(200).json({
                success: true,
                message: "user update succes fully",
                user
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "please enter valide oldpassword",

            })
        }
    } catch (error) {
        console.log(`error in update password controller ${error}`)
        res.status(400).json({
            success: false,
            message: "Update password failed",
            error
        });
    }
}

module.exports = {
    UpdateProfile_Pic_Controller,
    Update_user_controller,
    change_password_controller,
}