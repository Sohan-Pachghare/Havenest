const express = require("express")
const router = express.Router()
const Listing = require("../models/listing");
const { listingSchema } = require("../schema");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const ctrlListings = require("../Controllers/listings");

//read route
router.get("/", wrapAsync(ctrlListings.index));

// Create route 
//put this route fist than read route because  /listings/new is being interpreted as "/listings/:id" where new is treated as an id
router.get("/new", isLoggedIn, ctrlListings.renderNewForm );

router.post("/",
    isLoggedIn,
    validateListing,
    wrapAsync(ctrlListings.createListing));

// Update route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(ctrlListings.renderEditForm));

router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(ctrlListings.editListing));


// Delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(ctrlListings.deletedListing));


// Read route (Show an Listing in Detail)
router.get("/:id", wrapAsync(ctrlListings.renderShow));

module.exports = router;