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
          message: err.message
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
      })
    );
  },
  addService: async (req, res, next) => {
    if (req.body.name) {
      const service = await Service.findOne({ name: req.body.name });
      if (service) {
        if (!service.default_Service) {
          Service.findByIdAndUpdate(service._id, req.body, { new: true })
            .then(service => {
              return res.status(200).json({ service });
            })
            .catch(error => {
              return res.status(500).json({ error });
            });
        }
      } else {
        let service = new Service({ ...req.body });
        const newsServ = await service.save();

        console.log(newServ);

        return res.status(200).json({ service: newServ });
      }

      // .then(response => {
      //   return res.status(200).json({
      //     service: response
      //   });
      // })
      // .catch(err => {
      //   return res.status(500).json({
      //     error: err
      //   });
      // });
    }
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
  }
};
