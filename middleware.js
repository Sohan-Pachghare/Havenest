const Listing = require("./models/listing");
const Review = require("./models/reviews");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");

// validate Listing info
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
}

// validateReview middleware
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    req.session.originalUrl = req.originalUrl;
    // .isAuthenticated() returns true if user is logged in otherwise false
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to create a new listing!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    res.locals.originalUrl = req.session.originalUrl;
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let id = req.params.id;
    const currListing = await Listing.findById(id);
    if (!(currListing.owner.equals(res.locals.currentUser._id))) {
        req.flash("error", "Only Listing's Owner Can Edit!");
        return res.redirect("/listings");
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const review = await Review.findById(req.params.reviewId);
    if (!review.author._id.equals(res.locals.currentUser._id)) {
        console.log(review.author._id + res.locals.currentUser._id)
        req.flash("error", "Only Review's Author Can Delete Review");
        return res.redirect(`/listings/${req.params.id}`);
    }
    next();
}