const express = require("express")
//when we want access parent route params then use {mergeParams: true}
const router = express.Router({mergeParams: true})
const Listing = require("../models/listing");
const Review  = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const { reviewSchema } = require("../schema");

// validateReview middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
}

// Review Create route
router.post("/", validateReview, wrapAsync(async (req, res) => {
    // find listing in db
    let listing = await Listing.findById(req.params.id);
    //save review to Reviews model
    let newReview = new Review(req.body.review);
    await newReview.save();
    // add review to listing 
    listing.reviews.push(newReview);
    await listing.save();
    req.flash("success", "Review Added.");
    res.redirect(`/listings/${listing.id}`);
}));

//review Delete route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    /* $pull is operator removes from an existing array all instances os a value or values that match a specified condition */
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    //delete review from reviews collection
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted.");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;