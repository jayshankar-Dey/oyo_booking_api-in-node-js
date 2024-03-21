const Book_model = require('../model/book.model')
const Oyos = require("../model/oyo.model");

const oyo_book_controller = async(req, res) => {
    try {
        const { oyoID, roomID, price } = req.body
        const book = await Book_model.create({ user: req.user._id, oyoID, roomID, price })
        await Oyos.findByIdAndUpdate(oyoID, { $addToSet: { bookID: req.user._id } })
        const oyo = await Oyos.findById({ _id: oyoID });
        let index = -1
        oyo.rooms.forEach((room, i) => {
            if (room._id.toString() == roomID.toString()) index = i
        })
        if (index < 0) res.status(400).send({ message: "please enter valide roomid" })
        oyo.rooms[index].is_avelable = false
        await oyo.save()
        res.status(200).json({
            success: true,
            message: "oyo book succesfully",
            book,
            oyo
        });
    } catch (error) {
        console.log(`error in book controller api ${error}`.bgRed)
        if (error.name === "CastError") {
            res.status(400).json({
                success: false,
                message: "please enter valid id",
            });
        }
    }
}

const get_Single_Book_Controller = async(req, res) => {
    try {
        const { id } = req.params
        const book = await Book_model.findById(id).populate({
            path: "user",
            select: "name"
        })
        const oyo = await Oyos.findById(book.oyoID, { rooms: 0 })
        const oyos = await Oyos.findById(book.oyoID)
        const room = oyos.rooms.filter((room) => room._id.toString() == book.roomID.toString())
        res.status(200).json({
            success: true,
            message: " book get succesfully",
            book,
            oyo,
            room
        });
    } catch (error) {
        console.log(`error in book get controller api ${error}`.bgRed)
        if (error.name === "CastError") {
            res.status(400).json({
                success: false,
                message: "please enter valid id",
            });
        }
    }
}

module.exports = {
    oyo_book_controller,
    get_Single_Book_Controller
}