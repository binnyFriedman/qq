// Full Documentation - https://www.turbo360.co/docs
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const morgan = require("morgan");
const cors = require("cors");
/*
	Apps can also be initialized with config options as shown in the commented out example below. Options
	include setting views directory, static assets directory, and database settings. To see default config
	settings, view here: https://www.turbo360.co/docs
*/
const config = {
  views: "views", // Set views directory
  static: "public", // Set static assets directory
  enableAuth: true,
  db: {
    // Database configuration. Remember to set env variables in .env file: MONGODB_URI, PROD_MONGODB_URI
    url:
      process.env.TURBO_ENV == "dev"
        ? process.env.MONGODB_URI
        : process.env.PROD_MONGODB_URI,
    type: "mongo",
    onError: err => {
      console.log("DB Connection Failed!");
    },
    onSuccess: () => {
      console.log("DB Successfully Connected!");
    }
  }
};

const app = vertex.app(config); // initialize app with config options
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// import routes
const index = require("./routes/index");
const api = require("./routes/api");
const users = require("./routes/users");
const qoutes = require("./routes/quotes");
const services = require("./routes/services");

// set routes
app.use(morgan("dev"));
app.use("/", index);
app.use("/users", users);
app.use("/qoutes", qoutes);
app.use("/services", services);
module.exports = app;
