const Oyos = require('../model/oyo.model')
const likeController = async(req, res) => {
    try {
        const { id } = req.params;
        const oyo = await Oyos.findByIdAndUpdate(id, { $addToSet: { like: req.user._id } })
        res.status(200).json({
            success: true,
            message: "user like succesfully",
            oyo
        });
    } catch (error) {
        console.log(`like_controller ${error}`)
        if (error.name === "CastError") {
            res.status(400).json({
                success: false,
                message: "please enter valid id",

            });
        }
        res.status(400).json({
            success: false,
            message: "like_controller failed",
            error
        });
    }

}

//unlike controller
const unlikeController = async(req, res) => {
    try {
        const { id } = req.params;
        const oyo = await Oyos.findByIdAndUpdate(id, { $pull: { like: req.user._id } })
        res.status(200).json({
            success: true,
            message: "user Unlike succesfully",
            oyo
        });
    } catch (error) {
        console.log(`unlike_controller ${error}`)
        if (error.name === "CastError") {
            res.status(400).json({
                success: false,
                message: "please enter valid id",

            });
        }
        res.status(400).json({
            success: false,
            message: "unlike_controller failed",
            error
        });
    }

}

module.exports = {
    likeController,
    unlikeController
}