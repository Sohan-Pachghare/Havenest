const mongoose = require("mongoose");
const { max } = require("../schema");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

const Review = new mongoose.model("review", reviewSchema);

module.exports = Review;