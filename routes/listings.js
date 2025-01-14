const express = require("express")
const router = express.Router()
const Listing = require("../models/listing");
const { listingSchema } = require("../schema");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");

// validateListing middleware
const validateListing = (req, res, next) => {
    const {error} = listingSchema.validate(req.body);
    if(error) {
        const msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
}

//read route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}));

// Create route 
//put this route fist than read route because  /listings/new is being interpreted as "/listings/:id" where new is treated as an id
router.get("/new", isLoggedIn, (req, res) => {
    res.render("./listings/new.ejs");
});

router.post("/", validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}));

// Update route
router.get("/:id/edit", isLoggedIn, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if(!listing) {
        req.flash("errorMsg", "Requested Listing Does Not Exist.")
        res.redirect("/listings")
    } else {
    res.render("./listings/edit.ejs", { listing });
    }
}));

router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated Successfully!")
    res.redirect(`/listings/${id}`);
}));


// Delete route
router.delete("/:id", wrapAsync(async (req, res) => {
    let deletedListing = await Listing.findByIdAndDelete(req.params.id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted.");
    res.redirect("/listings");
}));


// Read route (Show an Listing in Detail)
router.get("/:id", wrapAsync(async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing) {
        req.flash("errorMsg", "Requested Listing Does Not Exist.")
        res.redirect("/listings")
    } else {
        res.render("./listings/show.ejs", { listing });
    }
}));

module.exports = router;