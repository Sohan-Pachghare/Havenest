const express = require("express")
//when we want access parent route params then use {mergeParams: true}
const router = express.Router({mergeParams: true})
const Listing = require("../models/listing");
const Review  = require("../models/reviews");
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware");
const ctrlReview = require("../Controllers/reviews");

// Review Create route
router.post("/", isLoggedIn, validateReview, wrapAsync(ctrlReview.createReview));

//review Delete route
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(ctrlReview.deleteReview));

module.exports = router;