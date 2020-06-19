const mongoose = require('mongoose');
const schema = mongoose.Schema;
const blogschema = new schema({
    Fname:  {type: String},
    Lname: {type: String},
    UserName: {type: String},
    Email: {type:String},
    Password: {type:String}
});

module.exports = mongoose.model('register',blogschema);