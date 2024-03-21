const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "user name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    address: {
        type: String,
        required: function() {
            if (this.isadmin === "user") {
                return [true, "address is required"]
            } else {
                return false
            }
        }
    },
    phone: {
        type: Number,
        required: function() {
            if (this.isadmin === "user") {
                return [true, "phone is required"]
            } else {
                return false
            }
        }
    },
    profile: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    isadmin: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

}, { timestamps: true })
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        next()
    }
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
});

///generate token
userSchema.methods.generateToken = async function() {
        return jwt.sign({
            _id: this._id
        }, process.env.JWT_SECRET)
    }
    //compare password
userSchema.methods.comparePassword = async function(oldpassword) {
    return bcrypt.compare(oldpassword, this.password)
}
const Users = mongoose.model("Users", userSchema)
module.exports = Users