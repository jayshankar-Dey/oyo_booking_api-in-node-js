const dataUriparser = require('datauri/parser')
const path = require('path');
const getFile = (file) => {
    const parser = new dataUriparser();
    const extname = path.extname(file.originalname).toString()
    return parser.format(extname, file.buffer)
}
module.exports = getFile