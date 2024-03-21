const Oyos = require("../model/oyo.model");
const getfile = require('../config/getFile')
const cloudinary = require('cloudinary');
const getFile = require("../config/getFile");
//create oyo controller
const create_Oyo_Controllor = async(req, res) => {
    try {
        const { oyo_name, address, des } = req.body
        if (oyo_name && address && des) {
            const oyo = await Oyos.create({ oyo_name, address, des, admin_id: req.user._id })
            res.status(200).json({
                success: true,
                message: "oyo create Succesfully",
                oyo
            })
        } else {
            res.status(400).json({
                success: false,
                message: "all fields are re"
            })
        }
    } catch (error) {
        console.log(`eror in create oyo api ${error}`.bgRed)
        res.status(400).json({
            success: false,
            message: "error in create oyo api",
            error
        });
    }

}

//update oyo controller
const update_Oyo_Controllor = async(req, res) => {
        try {
            const { oyo_name, address, des } = req.body
            const { id } = req.params;
            const oyo = await Oyos.findById(id)
            if (oyo.admin_id.toString() !== req.user._id.toString()) {
                res.status(400).json({
                    success: false,
                    message: "please enter valid user",

                });
            }
            if (oyo_name) oyo.oyo_name = oyo_name;
            if (address) oyo.address = address;
            if (des) oyo.des = des;
            console.log(oyo_name)
            await oyo.save()
            res.status(200).json({
                success: true,
                message: "oyo update succesfully",
                oyo
            })
        } catch (error) {
            console.log(`eror in update oyo api ${error}`)
            res.status(400).json({
                success: false,
                message: "error in update oyo api",
                error
            });
        }

    }
    //update  oyo image
const update_oyo_image_controller = async(req, res) => {
        try {
            const { id } = req.params
            const oyo = await Oyos.findById(id)

            if (!oyo) res.status(400).json({
                success: false,
                message: "oyo not found",
            })
            if (oyo.admin_id.toString() !== req.user._id.toString()) {
                res.status(400).json({
                    success: false,
                    message: "cannot metch user",
                });
            }
            const file = getFile(req.file);
            const cdb = await cloudinary.v2.uploader.upload(file.content)
            const image = {
                public_id: cdb.public_id,
                url: cdb.secure_url
            }
            oyo.image.push(image)
            await oyo.save()
            res.status(200).json({
                success: true,
                message: "image update succesfully",
                oyo
            })
        } catch (error) {
            console.log(`update_oyo_image_controller ${error}`)
            if (error.name === "CastError") {
                res.status(400).json({
                    success: false,
                    message: "please enter valid id",

                });
            }
            res.status(400).json({
                success: false,
                message: "update_oyo_image_controller",
                error
            });
        }

    }
    //update  oyo facilities
const Update_oyo_facilities = async(req, res) => {
        try {
            const { id } = req.params
            const oyo = await Oyos.findById(id)

            if (!oyo) res.status(400).json({
                success: false,
                message: "oyo not found",
            })
            if (oyo.admin_id.toString() !== req.user._id.toString()) {
                res.status(400).json({
                    success: false,
                    message: "cannot metch user",
                });
            }
            oyo.facilites.push(req.body.facilites)
            await oyo.save()
            res.status(200).json({
                success: true,
                message: "facility update succesfully",
                oyo
            })
        } catch (error) {
            console.log(`update_oyo_facility_controller ${error}`)
            if (error.name === "CastError") {
                res.status(400).json({
                    success: false,
                    message: "please enter valid id",

                });
            }
            res.status(400).json({
                success: false,
                message: "update_oyo_facility_controller",
                error
            });
        }

    }
    //delete oyo image/controller
const delete_Oyo_image_controller = async(req, res) => {
    try {
        const { id } = req.params
        const { imgID } = req.body
        const oyo = await Oyos.findById(id)

        if (!oyo) res.status(400).json({
            success: false,
            message: "oyo not found",
        })
        if (oyo.admin_id.toString() !== req.user._id.toString()) {
            res.status(400).json({
                success: false,
                message: "cannot metch user",
            });
        }
        let index = -1;
        oyo.image.forEach((image, i) => {
            if (image._id.toString() == imgID.toString()) index = i;
        })
        if (index < 0) res.status(400).send({
            success: false,
            message: "image not found"
        })
        await cloudinary.v2.uploader.destroy(oyo.image[index].public_id)
        oyo.image.pull(imgID)
        await oyo.save()
        res.status(200).json({
            success: true,
            message: "image delete succesfully",
            oyo
        })
    } catch (error) {
        console.log(`delete oyo image ${error}`)
        if (error.name === "CastError") {
            res.status(400).json({
                success: false,
                message: "please enter valid id",

            });
        }
        res.status(400).json({
            success: false,
            message: "delete oyo image_controller",
            error
        });
    }

}

///delete oyo facilities
const Delete_oyo_facilities = async(req, res) => {
        try {
            const { id } = req.params
            const oyo = await Oyos.findById(id)

            if (!oyo) res.status(400).json({
                success: false,
                message: "oyo not found",
            })
            if (oyo.admin_id.toString() !== req.user._id.toString()) {
                res.status(400).json({
                    success: false,
                    message: "cannot metch user",
                });
            }
            oyo.facilites.pull(req.body.facilites)
            await oyo.save()
            res.status(200).json({
                success: true,
                message: "facility delete succesfully",
                oyo
            })
        } catch (error) {
            console.log(`delete_oyo_facility_controller ${error}`)
            if (error.name === "CastError") {
                res.status(400).json({
                    success: false,
                    message: "please enter valid id",

                });
            }
            res.status(400).json({
                success: false,
                message: "delete_oyo_facility_controller",
                error
            });
        }

    }
    //get all room controller
const get_all_oyo_controller = async(req, res) => {
        try {
            const oyo = await Oyos.find({}, { rooms: 0, admin_id: 0 })
            res.status(200).json({
                success: true,
                message: "get all oyo succesfully",
                oyo

            })
        } catch (error) {
            console.log(`get all oyo_controller ${error}`)
            res.status(400).json({
                success: false,
                message: "get_all oyo _controller",
                error
            });
        }
    }
    //get single oyo controller
const get_single_oyo_controller = async(req, res) => {
    try {
        const { id } = req.params
        const oyos = await Oyos.findById(id)
        const room = oyos.rooms.filter((room) => room.is_avelable == true)
        const oyo = await Oyos.findById(id, { rooms: 0 })
        res.status(200).json({
            success: true,
            message: "get all oyo succesfully",
            room,
            oyo

        })
    } catch (error) {
        console.log(`get all oyo_controller ${error}`)
        res.status(400).json({
            success: false,
            message: "get_all oyo _controller",
            error
        });
    }
}

module.exports = {
    create_Oyo_Controllor,
    update_Oyo_Controllor,
    update_oyo_image_controller,
    Update_oyo_facilities,
    delete_Oyo_image_controller,
    Delete_oyo_facilities,
    get_all_oyo_controller,
    get_single_oyo_controller

}