const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    name: String,
    picture: String

});

const Banner = mongoose.model("banner", BannerSchema)

module.exports = Banner;
