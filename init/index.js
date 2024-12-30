const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

let MongoURL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(MongoURL);
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
    await Listing.insertMany(initData.data);
    console.log("DB initialized successfully");
}

initDB();