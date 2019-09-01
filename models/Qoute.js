const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const QouteSchema = new Schema({
  reciever: {
    Name: {
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
      url: {
        type: String,
      },
    },
  },

  services: [
    {
      organic: {
        type: Boolean,
        default: false,
      },
      campaign: {
        trim: true,
        type: Boolean,
        default: false,
      },
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
    },
  ],
  priceBlock: {
    notes: [
      {
        type: String,
        trim: true,
        default: "",
      },
    ],

    priceTable: [
      {
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
    ],
  },
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Qoute", QouteSchema, "qoutes");
