const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new.ejs");
}

module.exports.createListing = async (req, res) => {
    const url = req.file.path;
    const filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash("errorMsg", "Requested Listing Does Not Exist.")
        res.redirect("/listings")
    } else {
        res.render("./listings/edit.ejs", { listing });
    }
}

module.exports.editListing = async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.id, { ...req.body.listing });
    req.flash("success", "Listing Updated Successfully!")
    res.redirect(`/listings/${req.params.id}`);
}

module.exports.deletedListing = async (req, res) => {
    let deletedListing = await Listing.findByIdAndDelete(req.params.id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted.");
    res.redirect("/listings");
}

module.exports.renderShow = async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            }
        })
        .populate("owner");
        
    if (!listing) {
        req.flash("errorMsg", "Requested Listing Does Not Exist.")
        res.redirect("/listings")
    } else {
        res.render("./listings/show.ejs", { listing });
    }
}