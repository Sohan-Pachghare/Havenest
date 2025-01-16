const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("./users/signup.ejs")
}

module.exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Wellcome to Wanderlust");
            return res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }

}

module.exports.renderLoginForm = (req, res) => {
    res.render("./users/login.ejs")
}

module.exports.loginSuccess = async (req, res) => {
    req.flash("success", "Welcome Back to Wanderlust!");
    res.redirect(res.locals.originalUrl || "/listings");
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
    });
    req.flash("success", "Logged Out Successfully!")
    res.redirect("/listings");
}
