const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: "",
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
  },
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema, "users");
