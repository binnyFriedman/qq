const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Qoute Stucture
const QouteSchema = new Schema({
<<<<<<< HEAD
  created: {
    type: String
  },
=======
>>>>>>> 66e51450904b2a5e8ac508cb56ea3a30fcfbded7
  Reciever: {
    name: {
      type: String,
      trim: true,
      default: "",
<<<<<<< HEAD
      required: [true, "Reciever Name is required"]
=======
      required: [true, "Reciever Name is required"],
>>>>>>> 66e51450904b2a5e8ac508cb56ea3a30fcfbded7
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
<<<<<<< HEAD
      required: [true, "Email of reciever is required"]
    },
    logo: {
      url: {
        type: String
      }
    }
  },
  Sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
=======
      required: [true, "Email of reciever is required"],
    },
    logo: {
      url: {
        type: String,
      },
    },
  },
  Sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
>>>>>>> 66e51450904b2a5e8ac508cb56ea3a30fcfbded7
  },

  Services: [
    {
      type: Schema.Types.ObjectId,
<<<<<<< HEAD
      ref: "Service"
    }
  ]
=======
      ref: "Service",
    },
  ],
>>>>>>> 66e51450904b2a5e8ac508cb56ea3a30fcfbded7
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Qoute", QouteSchema, "qoutes");
