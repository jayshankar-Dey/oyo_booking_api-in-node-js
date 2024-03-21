const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    oyoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "oyos"
    },
    roomID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "oyos"
    },
    price: {
        type: String
    }

}, { timestamps: true })

const Bookmodels = mongoose.model("Bookmodels", bookSchema)
module.exports = Bookmodels