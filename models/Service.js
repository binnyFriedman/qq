const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const ServiceSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: "",
    required: [true, "Name is required"],
  },
  organic: {
    type: Boolean,
    default: false,
  },
  campaign: {
    trim: true,
    type: Boolean,
    default: false,
  },

  content: {
    header: {
      type: String,
      default: "",
      trim: true,
      required: [true, "Content header is required"],
    },
    body: [
      {
        value: {
          type: String,
          trim: true,
        },
      },
    ],
    priceBlock: {
      notes: {
        trim: true,
        type: String,
        default: "",
      },
      header: {
        trim: true,
        type: String,
        default: "",
      },
      price: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        trim: true,
        default: "",
      },
      monthly: {
        type: Boolean,
        default: true,
      },
    },
  },
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Service", ServiceSchema, "services");
