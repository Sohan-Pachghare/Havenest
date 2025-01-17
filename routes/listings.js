const express = require("express")
const router = express.Router()
const Listing = require("../models/listing");
const { listingSchema } = require("../schema");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const ctrlListings = require("../Controllers/listings");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.route("/")
    .get(wrapAsync(ctrlListings.index))
    // .post(
    //     isLoggedIn,
    //     validateListing,
    //     wrapAsync(ctrlListings.createListing)
    // )
    .post(upload.single("listing[image]"), (req, res) => {
        res.send(req.file)
    })

//put this route fist, because  /listings/new is being interpreted as "/listings/:id" where "new" is treated as an "id"
router.get("/new",  ctrlListings.renderNewForm); // add => isLoggedIn,

router.route("/:id")
    .put( 
        isLoggedIn, 
        isOwner, 
        validateListing, 
        wrapAsync(ctrlListings.editListing)
    )
    .delete(
        isLoggedIn, 
        isOwner, 
        wrapAsync(ctrlListings.deletedListing)
    )
    .get(wrapAsync(ctrlListings.renderShow));

// Update route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(ctrlListings.renderEditForm)
);


module.exports = router;