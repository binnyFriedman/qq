const Service = require("../models/Service");

async function findService(serviceName) {
  return await Service.findOne({ name: serviceName });
}

module.exports = {
  getServices: async (req, res, next) => {
    Service.find()
      .then(services => {
        console.log(services);

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

  addService: async (req, res, next) => {
    const { formContainer, priceBlock } = req.body;
    findService(formContainer.serv_name).then(existService => {
      if (!existService) {
        //create new service
        let service = new Service();
        service.name = formContainer.serv_name;
        service.organic = req.body.organic;
        service.campaigns = req.body.campaigns;
        service.content.header = formContainer.serv_header;
        service.content.body = [...formContainer.serv_body];
        service.content.priceBlock.price = priceBlock.price;
        service.content.priceBlock.currency = priceBlock.currency;
        service.content.priceBlock.notes = priceBlock.notes;
        service.content.priceBlock.header = priceBlock.header;
        service.content.priceBlock.monthly = priceBlock.monthly;
        service
          .save()
          .then(response => {
            res.json({
              succsess: true,
              data: response,
            });
          })
          .catch(err => {
            res.json({
              succsess: false,
              error: err.message,
            });
          });
      } else {
        res.json({
          succsess: false,
          message: "Service in this name already exists",
          data: service,
        });
      }
    });
  },
};
