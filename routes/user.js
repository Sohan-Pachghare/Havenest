const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const ctrlUser = require("../Controllers/users");
// Signup routes
router.get("/signup", ctrlUser.renderSignupForm);

router.post("/signup", ctrlUser.signup);


// Login routes
router.get("/login", ctrlUser.renderLoginForm);

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    ctrlUser.loginSuccess
);

//logout route
router.get("/logout", ctrlUser.logout );

module.exports = router;
