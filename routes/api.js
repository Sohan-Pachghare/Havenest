const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const User = require("../models/user");
const Review = require("../models/reviews");
const passport = require("passport");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const wrapAsync = require("../utils/wrapAsync");
const { validateListing, validateReview } = require("../middleware");
const axios = require("axios");

const isLoggedInApi = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: "You must be logged in." });
};

const isOwnerApi = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ error: "Listing not found." });
  if (!listing.owner.equals(req.user._id)) return res.status(403).json({ error: "Only listing owner can do this." });
  next();
};

const isAuthorApi = async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) return res.status(404).json({ error: "Review not found." });
  if (!review.author.equals(req.user._id)) return res.status(403).json({ error: "Only review author can delete." });
  next();
};

// Build req.body.listing from multipart fields listing[title], listing[price], etc.
const parseListingBody = (req, res, next) => {
  if (req.body.listing) return next();
  const listing = {};
  for (const key of Object.keys(req.body)) {
    const m = key.match(/^listing\[([^\]]*)\](\[\])?$/);
    if (!m) continue;
    const prop = m[1];
    if (m[2]) {
      const val = req.body[key];
      listing[prop] = Array.isArray(val) ? val : [val];
    } else {
      listing[prop] = req.body[key];
    }
  }
  req.body.listing = listing;
  next();
};

// GET /api/me - current user
router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ user: null });
  res.json({ user: { _id: req.user._id, username: req.user.username, email: req.user.email } });
});

// GET /api/listings
router.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.json({ listings: allListings });
}));

// GET /api/listings/search?filter=
router.get("/listings/search", wrapAsync(async (req, res) => {
  const filter = req.query.filter;
  const allListings = await Listing.find({});
  const filtered = filter
    ? allListings.filter((l) => l.categories && l.categories.includes(filter))
    : allListings;
  res.json({ filter: filter || null, listings: filtered });
}));

// GET /api/listings/:id
router.get("/listings/:id", wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) return res.status(404).json({ error: "Listing not found." });
  res.json({ listing });
}));

// POST /api/listings
router.post(
  "/listings",
  isLoggedInApi,
  upload.single("listing[image]"),
  parseListingBody,
  validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    if (req.file) {
      newListing.image = { url: req.file.path, filename: req.file.filename };
    }
    newListing.owner = req.user._id;
    if (newListing.location && newListing.country) {
      try {
        const response = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
          params: {
            q: `${newListing.location},${newListing.country}`,
            limit: 1,
            appid: process.env.OPEN_WEATHER_API_KEY,
          },
        });
        if (response.data && response.data[0]) {
          const { lon, lat } = response.data[0];
          newListing.geometry = { type: "Point", coordinates: [lon, lat] };
        }
      } catch (e) {
        // continue without geometry
      }
    }
    await newListing.save();
    res.status(201).json({ listing: newListing, message: "New Listing Created!" });
  })
);

// PUT /api/listings/:id
router.put(
  "/listings/:id",
  isLoggedInApi,
  isOwnerApi,
  upload.single("listing[image]"),
  parseListingBody,
  validateListing,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findByIdAndUpdate(req.params.id, { ...req.body.listing }, { new: true });
    if (req.file) {
      listing.image = { url: req.file.path, filename: req.file.filename };
      await listing.save();
    }
    res.json({ listing, message: "Listing Updated Successfully!" });
  })
);

// DELETE /api/listings/:id
router.delete(
  "/listings/:id",
  isLoggedInApi,
  isOwnerApi,
  wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing Deleted." });
  })
);

// POST /api/listings/:id/reviews
router.post(
  "/listings/:id/reviews",
  isLoggedInApi,
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found." });
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();
    const populated = await Listing.findById(req.params.id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    res.status(201).json({ listing: populated, message: "Review Added." });
  })
);

// DELETE /api/listings/:id/reviews/:reviewId
router.delete(
  "/listings/:id/reviews/:reviewId",
  isLoggedInApi,
  isAuthorApi,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    res.json({ listing, message: "Review Deleted." });
  })
);

// POST /api/login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info?.message || "Invalid credentials." });
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ user: { _id: user._id, username: user.username, email: user.email } });
    });
  })(req, res, next);
});

// POST /api/signup
router.post("/signup", wrapAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ email, username });
  const registeredUser = await User.register(newUser, password);
  req.login(registeredUser, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ user: { _id: registeredUser._id, username: registeredUser.username, email: registeredUser.email } });
  });
}));

// POST /api/logout
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ ok: true });
  });
});

module.exports = router;
