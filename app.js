const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");
const Review  = require("./models/review");


main()
    .then(() => { console.log("connected to mongoDB"); })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

// Body parsing middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// other middleware
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//root route
app.get("/", (req, res) => {
    res.send("on root route");
});

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
// validateReview middleware
const validateReview = (req, res, next) => {
    const { error }  = reviewSchema.validate(req.body);
    if(error) {
        let msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
}


//index route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}));

// new route 
//put this route fist than read route because : /listings/new is being interpreted as "/listings/:id" where new is treated as an id
app.get("/listings/new", (req, res) => {
    res.render("./listings/new.ejs");
});

//adding new listing to db
app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    })
);

//update (edit) opration
app.get("/listings/:id/edit",  wrapAsync(async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
}));

app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

//delete route
app.delete("/listings/:id",  wrapAsync(async (req, res) => {
    let id = req.params.id;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

//show route (read operation)
app.get("/listings/:id",  wrapAsync(async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs", { listing });
}));

//Reviews
// new review
app.post("/listings/:id/reviews", validateReview, wrapAsync( async (req, res) => {
    // find listing in db
    let listing = await Listing.findById(req.params.id);
    //save review to Reviews model
    let newReview = new Review(req.body.review);
    await newReview.save();
    // add review to listing 
    listing.reviews.push(newReview);
    await listing.save();
    res.redirect(`/listings/${listing.id}`);
}));

// res for * (all) other req
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// error handling middleware
app.use((err, req, res, next) => {
    let { status=500, message="somthing went wrong at server side !" } = err;
    res.status(status).render("./listings/error.ejs", { message });
});



app.listen(8080, () => {
    console.log("server is listening on port 8080");
});

// Dumping yard
/* 

app.get("/sample", async (req, res) => {
    let listing1 =  Listing({
        title: "Maniratna",
        description: "Bigest in Vidharbha",
        image: "",
        price: "2500",
        location: "on Nagpur-Mumbai highway",
        country: "India"

    });
    await listing1.save();
    console.log("Sample is saved");
    res.send("Sucessful");
});


*/