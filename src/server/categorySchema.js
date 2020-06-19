const mongoose = require('mongoose');
const schema = mongoose.Schema;

const category = new schema({
    Category : {type:String},
    Image : {type:String}
})

module.exports = mongoose.model('categories',category);
