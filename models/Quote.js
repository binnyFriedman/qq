const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Quote Stucture
const QuoteSchema = new Schema({
  created: {
    type: String,
  },
  Reciever: {
    name: {
      type: String,
      trim: true,
      default: "",
      required: [true, "Reciever Name is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email of reciever is required"],
    },
    logo: {
      type: String,
    },
  },
  Sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  SenderSpecial: {
    displayName: {
      type: String,
    },
    email: {
      type: String,
    },
  },

  Services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Quote", QuoteSchema, "qoutes");
