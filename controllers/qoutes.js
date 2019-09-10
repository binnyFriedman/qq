const Qoute = require("../models/Qoute");

module.exports = {
  getQoutes: async (req, res, next) => {
    //get email and password
    Qoute.find()
      .populate("Services")
      .populate("Sender")
      .exec()
      .then(qouts => {
        console.log(qouts);

        res.status(200).json({ Qoutes: qouts });
      })
      .catch(error => {
        res.status(402).json({ error: error });
      });
  },
  getSingleQoute: async (req, res, next) => {
    const id = req.params.id;

    if (!id)
      return res
        .status(403)
        .json({ error: "req must contain the id of the quote" });
    Qoute.findById(id)
      .populate("Services")
      .populate("Sender")
      .exec()
      .then(quote => {
        if (!quote) {
          return res.status(404).json("Quote does not exist");
        }
        res.status(200).json({ quote: quote });
      });
  },
  deleteQoute: async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
      return res
        .status(500)
        .json({ error: "req must contain the id of the qoute" });
    }
    Qoute.findByIdAndDelete(id)
      .then(res => {
        return res
          .status(200)
          .json({ message: "deleted Succesfully", res: res });
      })
      .catch(error => {
        return res.status(500).json({ error: error });
      });
  },
  createQoute: async (req, res, next) => {
    current_datetime = new Date();
    const newQoute = new Qoute({
      created:
        current_datetime.getDate() +
        "/" +
        (current_datetime.getMonth() + 1) +
        "/" +
        current_datetime.getFullYear(),
      Reciever: req.body.Reciever,
      Sender: req.user._id,
      Services: [...req.body.services],
    });
    newQoute
      .save()
      .then(qoute => {
        res.status(200).json({ qoute });
      })
      .catch(err => {
        res.status(500).json({ err });
      });
  },
  updateQoute: async (req, res, next) => {
    Qoute.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("Services")
      .populate("Sender")
      .exec((error, responce) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ qoute: responce });
      });
  },
};
