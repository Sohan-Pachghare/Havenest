const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');

main()
    .then(() => { console.log("connected to mongoDB"); })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
});

// new route 
//put this route fist than read route because : /listings/new is being interpreted as "/listings/:id" where new is treated as an id
app.get("/listings/new", (req, res) => {
    res.render("./listings/new.ejs");
});
//adding listing to db
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//update opration
app.get("/listings/:id/edit", async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id", async (req, res) => {
    let id = req.params.id;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

//show route (read operation)
app.get("/listings/:id", async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    res.render("./listings/show.ejs", { listing });
});


// app.get("/sample", async (req, res) => {
//     let listing1 =  Listing({
//         title: "Maniratna",
//         description: "Bigest in Vidharbha",
//         image: "",
//         price: "2500",
//         location: "on Nagpur-Mumbai highway",
//         country: "India"

//     });
//     await listing1.save();
//     console.log("Sample is saved");
//     res.send("Sucessful");
// });

app.listen(8080, () => {
    console.log("server is listening on port 8080");
});