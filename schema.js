const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object(),
    price: Joi.number().min(0).required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    categories: Joi.array(),
    geometry: Joi.object({
      type: Joi.string().required(),
      coordinates: Joi.array().required(),
    }),
  }).required(),
});

//review Schema
const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),

    comment: Joi.string().required(),
  }).required(),
});

module.exports = { listingSchema, reviewSchema };
