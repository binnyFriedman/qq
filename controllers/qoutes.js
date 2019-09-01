const Qoute = require("../models/Qoute");

module.exports = {
  getQoutes: async (req, res, next) => {
    //get email and password
    Qoute.find()
      .then(qouts => {
        res.status(200).json({ Qoutes: qouts });
      })
      .catch(error => {
        res.status(402).json({ error: error });
      });
  },
  getSingleQoute: async (req, res, next) => {
    const id = req.body.id;
    if (!id)
      return res
        .status(403)
        .json({ error: "req must contain the id of the qoute" });
    Qoute.findById(id).then(qoute => {
      if (!qoute) {
        return res.status(404).json("Qoute does not exist");
      }
      res.status(200).json({ qoute: qoute });
    });
  },
  deleteQoute: async (req, res, next) => {
    const id = req.body.id;
    if (!id) {
      return res
        .status(403)
        .json({ error: "req must contain the id of the qoute" });
    }
    Qoute.findByIdAndDelete(id)
      .then(res => {
        return res
          .status(200)
          .json({ message: "deleted Succesfully", res: res });
      })
      .catch(error => {
        return res.status(402).json({ error: error });
      });
  },
};
