const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Qoute Stucture
const QouteSchema = new Schema({
  created: {
    type: String
  },
  Reciever: {
    name: {
      type: String,
      trim: true,
      default: "",
      required: [true, "Reciever Name is required"]
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email of reciever is required"]
    },
    logo: {
      type: String
    }
  },
  Sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  Services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service"
    }
  ]
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Qoute", QouteSchema, "qoutes");
