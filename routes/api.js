// Full Documentation - https://www.turbo360.co/docs
const turbo = require("turbo360")({ site_id: process.env.TURBO_APP_ID });
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();

const Service = require("../models/Service");
router.get("/services", (req, res) => {
  Service.find()
    .then(services => {
      res.json({
        confirmation: "succses",
        data: services,
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message,
      });
    });
});

async function findService(serviceName) {
  return await Service.findOne({ name: serviceName });
}

// this is our create methid
// this method adds new data in our database
router.post("/service/add", (req, res) => {
  const { formContainer, priceBlock } = req.body;

  findService(formContainer.serv_name).then(service => {
    console.log(service);

    if (!service) {
      service = new Service();
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
        .then(responce => {
          console.log(responce);
          res.json({
            succsess: true,
            data: responce,
          });
        })
        .catch(err => {
          console.log(err.message);
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
});






module.exports = router;
