const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const ctrlUser = require("../Controllers/users");

router.route("/signup")
    .get( ctrlUser.renderSignupForm)
    .post(ctrlUser.signup)

router.route("/login")
.get( ctrlUser.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    ctrlUser.loginSuccess
)

//logout route
router.get("/logout", ctrlUser.logout );

module.exports = router;
