const JWT = require("jsonwebtoken");
const User = require("../models/User");

async function findUser(userEmail) {
  return await User.findOne({ "local.email": userEmail });
}

signToken = user => {
  return JWT.sign(
    {
      iss: "binnyAtNekuda",
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    process.env.JWT_SECRET
  );
};

module.exports = {
  signup: async (req, res, next) => {
    //get email and password
    const { email, password } = req.value.body;
    findUser(email).then(user => {
      if (!user) {
        //email does not exist yet in the system
        const userI = new User({
          method: "local",
          local: {
            email: email,
            password: password
          }
        });
        userI.save().then(() => {
          const token = signToken(userI);
          res.status(200).json({ token });
        });
      } else {
        return res.json({
          message: "this email is allready taken, please login"
        });
      }
    });
  },
  signin: async (req, res, next) => {
    //Generate token

    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOauth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  secret: async (req, res, next) => {
    //yet to come
    console.log("hit secret");
    res.json({ message: "אוי ווווווובוייייי" });
  },
  getOne: async (req, res, next) => {
    findUser(req.body.email).then(user => {
      if (!user) {
        res.json({
          auth: false,
          message: "Sorry we did not find your email registered please contact dev team to solve this"
        });
      } else {
        res.json({
          auth: true,
          message: "Welcome back" + user.name
        });
      }
    });
  }
};
