const Listing = require("../models/listing");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

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

module.exports.generateDescription = async (req, res) => {
    try {
        const { title, location, categories } = req.body;

        const safeTitle = typeof title === "string" ? title.trim() : "";
        const safeLocation = typeof location === "string" ? location.trim() : "";
        const categoryArray = Array.isArray(categories) ? categories : [];
        const categoriesText = categoryArray.filter(Boolean).join(", ");

        if (!safeTitle && !safeLocation && categoryArray.length === 0) {
            return res.status(400).json({
                error: "Please provide at least a title, location, or one category.",
            });
        }

        const prompt = `
You are an expert copywriter for Airbnb-style vacation rentals.
Write a short, engaging property description in 3–4 sentences.

Details:
- Title: ${safeTitle || "Not specified"}
- Location: ${safeLocation || "Not specified"}
- Categories / vibe: ${categoriesText || "Not specified"}

Focus on the experience, atmosphere, and ideal guests.
Do not use markdown, headings, or bullet points—return plain text only.
Avoid repeating the title or location verbatim in every sentence.
        `.trim();

        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        const generatedText = (response && typeof response.text === "function")
            ? response.text().trim()
            : "";

        if (!generatedText) {
            return res.status(500).json({
                error: "AI did not return any description. Please try again.",
            });
        }

        res.json({ description: generatedText });
    } catch (err) {
        console.error("Error generating AI description:", err);
        res.status(500).json({
            error: "Failed to generate description. Please try again later.",
        });
    }
};

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

module.exports.renderPaymentForm = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash("error", "Requested Listing Does Not Exist.");
        return res.redirect("/listings");
    }
    res.render("./listings/payment.ejs", { listing });
};