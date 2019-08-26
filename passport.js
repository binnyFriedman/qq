const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const GoogleToken = require("passport-google-plus-token");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

//jwt strategy
passport.use(
  new JWTstrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        //Find users scecified in token
        const user = await User.findById(payload.sub);
        //if user dosnt exist , handle it
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
//local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      //find the user with email
      try {
        const user = await User.findOne({ "local.email": email }); //very importent to await !!!

        //case not handle if
        if (!user) {
          return done(null, false);
        }
        //check if password is correct
        // console.log(user);

        const isMatch = await user.isValidPassword(password);

        //case not handle if
        if (!isMatch) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
//google oauth strategy

passport.use(
  "googleToken",
  new GoogleToken(
    {
      clientID: process.env.GOOGLE_C_ID,
      clientSecret: process.env.GOOGLE_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
