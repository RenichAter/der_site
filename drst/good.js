const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoodSchema = new Schema({
    name: String,
    description: String,
    features: String,
    featuresFull: String,
    price: Number,
    picture: String,
    type: String

});

const Good = mongoose.model("good", GoodSchema)

module.exports = Good;
