const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const dbUrl =  process.env.DATABASE_URL;

async function main() {
    await mongoose.connect(dbUrl);
}

main()
 .then(() => {
    console.log("Connected successfully")
})
 .catch((err) => { 
    console.log("Error while connecting to DB")
});



const initDB = async () => {
    await Listing.deleteMany({});
    // add owner property to data.
    initData.data =initData.data.map((obj) => ({
        ...obj,
        owner: '678fa5f58538705cfc383b0e',
    }));

    await Listing.insertMany(initData.data);
    console.log("DB initialized successfully");
}

initDB();