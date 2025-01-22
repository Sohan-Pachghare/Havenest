const Listing = require("../models/listing");
const axios = require('axios');

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new.ejs");
}

module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    const url = req.file.path;
    const filename = req.file.filename;
    newListing.image = { url, filename }; // url is listing_img_url, filename is img's name
    newListing.owner = req.user._id;
    // geocoding call
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
        params: {
            q: `${newListing.location},${newListing.country}`,
            limit: 1,
            appid: `${process.env.OPEN_WEATHER_API_KEY}`
        }
    })
    // convert into GeoJson Object
    const { lon, lat } = response.data[0];
    newListing.geometry = { type: 'Point', coordinates: [lon, lat] } // GeoJson geometry co-ordinates has lon before lat. Main identification factor
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash("errorMsg", "Requested Listing Does Not Exist.")
        return res.redirect("/listings")
    }
    let lowQualityImg = listing.image.url.replace("/upload", "/upload/c_limit,w_400");
    res.render("./listings/edit.ejs", { listing, lowQualityImg });
}

module.exports.editListing = async (req, res) => {
    let listing = await Listing.findByIdAndUpdate(req.params.id, { ...req.body.listing });
    if (req.file) {
        console.log(req.file)
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename }
        await listing.save();
    }
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
    const listing = await Listing.findById(req.params.id)
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

module.exports.filterListings = async (req, res) => {
    const filter = req.query.filter;
    const allListings = await Listing.find({});
    res.render("./listings/filter.ejs", { filter, allListings });
}