const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uid: {type: String,required: true},
    name: {type: String,required: true},
    lastName: {type: String,required:true},
    dateOfBirth: {type: Date,required:true}
});

const User = mongoose.model("User",userSchema);

module.exports = User;