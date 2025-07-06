const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const validator = require("validator");

let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // ensures no duplicate emails in the DB
    lowercase: true, // stores emails in lowercase
    validate: [validator.isEmail, "Please provide a valid email address"], //check other validation conditions
  },
});

userSchema.plugin(passportLocalMongoose); //passportLocalMongoose: used for hashing,salting,username,password and few methods like authentication etc

module.exports = mongoose.model("User", userSchema);
