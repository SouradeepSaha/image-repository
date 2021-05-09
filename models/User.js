const mongoose = require("mongoose");
const passoprtLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(passoprtLocalMongoose);
module.exports = mongoose.model("users", userSchema);
