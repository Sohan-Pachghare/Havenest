
const isLoggedIn = (req, res, next) => {
    // .isAuthenticated() returns true if user is logged in otherwise false
    if(!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to create a new listing!");
        return res.redirect("/login");
    } 
    next();
    
}

module.exports = { isLoggedIn };