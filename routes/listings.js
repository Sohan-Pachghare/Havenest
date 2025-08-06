const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const ctrlListings = require("../Controllers/listings");
const multer = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })
const Listing = require("../models/listing");


router.route("/")
    .get(wrapAsync(ctrlListings.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(ctrlListings.createListing)
    )

router.get("/new", isLoggedIn, ctrlListings.renderNewForm);

router.get('/search', ctrlListings.filterListings);

router.get("/:id/payment", isLoggedIn, wrapAsync(ctrlListings.renderPaymentForm));

// Update route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(ctrlListings.renderEditForm)
);

// Update route
router.route("/:id")
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(ctrlListings.editListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(ctrlListings.deletedListing)
    )
    .get(wrapAsync(ctrlListings.renderShow));


module.exports = router;