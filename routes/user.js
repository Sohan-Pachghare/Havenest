const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport")

// Signup routes
router.get("/signup", (req, res) => {
    res.render("./users/signup.ejs")
});

router.post("/signup", async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Wellcome to Wanderlust");
            return res.redirect("/listings");
        });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }
    
});


// Login routes
router.get("/login", ( req, res) => {
    res.render("./users/login.ejs")
});

router.post("/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    async(req, res) => {
        req.flash("success", "Welcome Back to Wanderlust!");
        res.redirect("/listings");
});

//logout route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) {
           next(err);
        }
    });
    req.flash("success", "Logged Out Successfully!")
    res.redirect("/listings");
})
module.exports = router;
