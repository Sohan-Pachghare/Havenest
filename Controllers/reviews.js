const Review = require("../models/reviews");
const Listing = require("../models/listing");

module.exports.createReview = async (req, res) => {
    // find listing in db
    let listing = await Listing.findById(req.params.id);
    //save review to Reviews model
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    await newReview.save();
    // add review to listing 
    listing.reviews.push(newReview);
    await listing.save();
    req.flash("success", "Review Added.");
    res.redirect(`/listings/${listing.id}`);
}

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    /* $pull  removes from an existing array all instances of a value or values that match a specified condition */
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    //delete review from reviews collection
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted.");
    res.redirect(`/listings/${id}`);
}