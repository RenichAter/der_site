const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecallSchema = new Schema({
    mail: String,
    descriptionRecall: String,
});

const Recall = mongoose.model("recall", RecallSchema)

module.exports = Recall;
