const mongoose = require("mongoose");

const wikiappSchema = new mongoose.Schema({
  Name: String,
  Text: String,
});

module.exports = mongoose.model("Wikiapp", wikiappSchema);
