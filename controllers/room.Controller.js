//
const Oyos = require("../model/oyo.model");
const getfile = require('../config/getFile')
const cloudinary = require('cloudinary');
const getFile = require("../config/getFile");

//create room controller
const create_room_controller = async(req, res) => {
        try {
            const { id } = req.params
            const { room_no, room_name, room_des, price } = req.body
            const oyo = await Oyos.findById(id)
            const room = { room_no, room_name, room_des, price }
            oyo.rooms.push(room)
            await oyo.save()
            res.status(200).json({
                success: true,
                message: "room created succesfully",
                oyo
            })
        } catch (error) {
            console.log(`create_oyo_room_controller ${error}`)
            if (error.name === "CastError") {
                res.status(400).json({
                    success: false,
                    message: "please enter valid id",

                });
            }
            res.status(400).json({
                success: false,
                message: "create_oyo_room_controller",
                error
            });
        }

    }
    //update room image
const update_room_image_controller = async(req, res) => {
        try {
            const { id } = req.params
            const { roomID } = req.body
            const oyo = await Oyos.findOne({ _id: id })
            let index = -1;
            oyo.rooms.forEach((room, i) => {
                if (room._id.toString() == roomID.toString()) index = i
            })
            if (index < 0) return res.status(400).json({
                success: false,
                message: "image not found"
            })
            console.log(index)
            const file = getFile(req.file)
            const cdb = await cloudinary.v2.uploader.upload(file.content)
            const image = {
                public_id: cdb.public_id,
                url: cdb.secure_url
            }

            oyo.rooms[index].image.push(image);
            await oyo.save()
            res.status(200).json({
                success: true,
                message: "room image update succesfully",
                oyo
            })
        } catch (error) {
            console.log(`update_room_image_controller ${error}`)
            if (error.name === "CastError") {
                res.status(400).json({
                    success: false,
                    message: "please enter valid id",

                });
            }
            res.status(400).json({
                success: false,
                message: "update_room_image_controller",
                error
            });
        }

    }
    //update room controller
const update_room_controller = async(req, res) => {
        try {
            const { room_no, room_name, room_des, price, is_avelable } = req.body
            const { id } = req.params
            const { roomID } = req.query
            const oyo = await Oyos.findById(id)
            let index = -1;
            oyo.rooms.forEach((room, i) => {
                if (room._id.toString() == roomID.toString()) index = i
            })
            if (index < 0) return res.status(400).json({
                success: false,
                message: "room not found"
            })

            if (room_no) oyo.rooms[index].room_name = room_no
            if (room_name) oyo.rooms[index].room_name = room_name
            if (room_des) oyo.rooms[index].room_des = room_des
            if (price) oyo.rooms[index].price = price
            if (is_avelable) oyo.rooms[index].is_avelable = is_avelable

            await oyo.save()
            res.status(200).json({
                success: true,
                message: "room update succesfully",
                oyo
            })
        } catch (error) {
            console.log(`update_oyo_room_controller ${error}`)
            if (error.name === "CastError") {
                res.status(400).json({
                    success: false,
                    message: "please enter valid id",

                });
            }
            res.status(400).json({
                success: false,
                message: "update_oyo_room_controller",
                error
            });
        }

    }
    //update room controller
const delete_room_controller = async(req, res) => {
        try {
            const { id } = req.params;
            const { roomID } = req.query;
            const oyo = await Oyos.findById(id)
            let index = -1;
            oyo.rooms.forEach((room, i) => {
                if (room._id.toString() == roomID.toString()) index = i
            })
            if (index < 0) return res.status(400).json({
                success: false,
                message: "room not found"
            })

            for (let i = 0; i < oyo.rooms[index].image.length; i++) {
                await cloudinary.v2.uploader.destroy(oyo.rooms[index].image[i].public_id)
            }
            oyo.rooms.pull(roomID)
            await oyo.save()

            res.status(200).json({
                success: true,
                message: "room delete succesfully",
                oyo

            })
        } catch (error) {
            console.log(`delete_oyo_room_controller ${error}`)
            if (error.name === "CastError") {
                res.status(400).json({
                    success: false,
                    message: "please enter valid id",

                });
            }
            res.status(400).json({
                success: false,
                message: "delete_oyo_room_controller",
                error
            });
        }

    }
    //get single room api
const get_single_room_controller = async(req, res) => {
        try {
            const { id } = req.params;
            const { roomID } = req.query;
            const oyo = await Oyos.findById({ _id: id }, {
                rooms: { $elemMatch: { _id: roomID } }
            })


            res.status(200).json({
                success: true,
                message: "room get succesfully",
                oyo

            })
        } catch (error) {
            console.log(`get_single_oyo_room_controller ${error}`)
            if (error.name === "CastError") {
                res.status(400).json({
                    success: false,
                    message: "please enter valid id",

                });
            }
            res.status(400).json({
                success: false,
                message: "get_single_oyo_room_controller",
                error
            });
        }

    }
    //get all room controller

module.exports = {
    create_room_controller,
    update_room_controller,
    update_room_image_controller,
    delete_room_controller,
    get_single_room_controller,

}