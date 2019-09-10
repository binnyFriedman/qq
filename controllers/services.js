const Service = require("../models/Service");

async function findService(serviceName) {
  return await Service.findOne({ name: serviceName });
}

module.exports = {
  getServices: async (req, res, next) => {
    Service.find()
      .then(services => {
        res.status(200).json({ services });
      })
      .catch(err => {
        res.status(404).json({
          confirmation: "fail",
          message: err.message,
        });
      });
  },

  getService: async (req, res, next) => {
    const id = req.body.id;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "No such service" });
    }
  },
  updateService: async (req, res, next) => {
    const id = req.params.id;
    Service.findByIdAndUpdate(
      id,
      req.body.updateData,
      (err => {
        return res.status(500).json({ err });
      },
      response => {
        res.status(200).json({ service: response });
      }),
    );
  },
  addService: async (req, res, next) => {
    //create new service
    console.log("req.body", req.body);

    let service = new Service({ ...req.body });
    service
      .save()
      .then(response => {
        res.status(200).json({
          service: response,
        });
      })
      .catch(err => {
        res.status(500).json({
          succsess: false,
          error: err.message,
        });
      });
  },
  updateService: async (req, res, next) => {
    const id = req.params.id;
    Service.findByIdAndUpdate(id, req.body, (err, response) => {
      if (err) {
        console.log(err);

        return res.status(500).json({ error: err });
      }
      res.status(200).json({ service: response });
    });
  },
};
