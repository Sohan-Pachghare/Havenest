const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const Listing = require("./models/listing");
const methodOverride = require("method-override");


app.set(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

main()
    .then(() => { console.log("connected to mongoDB"); })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

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

app.post("/listings", async (req, res) => {
    let listing = req.body.listing;
    console.log(listing);
})

;//show route (read operation)
app.get("/listings/:id", async (req, res) => {
    let id = req.params.id;
    let propertyInfo = await Listing.findById(id);
    res.render("./listings/show.ejs", { propertyInfo });
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