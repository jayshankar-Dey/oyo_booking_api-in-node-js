const isadmin = async(req, res, next) => {
    if (req.user.isadmin === "admin") {
        next()
    } else {
        res.status(500).json({
            success: false,
            message: "Only admin can change"
        });
    }
}


module.exports = isadmin;