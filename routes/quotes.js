const express = require("express");

const router = require("express-promise-router")();
const passport = require("passport");
const passportConfig = require("../passport");
const { validateBody, schemas } = require("../helpers/routeHelpers");
//passport methods for user auth
const passportJWT = passport.authenticate("jwt", { session: false });
const QoutsController = require("../controllers/qoutes");

router.route("/").get(passportJWT, QoutsController.getQoutes);

router.route("/single/:id").get(passportJWT, QoutsController.getSingleQoute);

module.exports = router;
