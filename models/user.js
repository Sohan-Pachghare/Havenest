const { required } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
    
});
// Adds authentication-related methods to the User model.
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);