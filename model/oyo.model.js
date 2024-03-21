const mongoose = require('mongoose');
const oyoSchema = new mongoose.Schema({
    oyo_name: {
        type: String,
        required: [true, "oyo name is required"]
    },
    address: {
        type: String,
        required: [true, "address is required"]
    },
    des: {
        type: String,
        required: [true, "description is required"]
    },
    facilites: [{
        type: String
    }],
    image: [{
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    }],
    rooms: [{
        room_no: String,
        room_name: String,
        room_des: String,
        image: [{
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        }],
        is_avelable: {
            type: Boolean,
            required: [true, "is avelable is required"],
            enum: ["true", "false"],
            default: true
        },
        price: {
            type: Number
        }
    }],
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    bookID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
}, { timestamps: true })

const Oyos = mongoose.model("oyos", oyoSchema)

module.exports = Oyos