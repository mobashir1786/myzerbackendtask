const mongoose = require('mongoose');
// schema to store static data in mongoDB
const schema = new mongoose.Schema({
    welcome_txt: {
        type: String
    },
    paragraph: {
        type: String
    }
})
module.exports = schema;