const mongoose = require("mongoose");
const { Schema } = mongoose;

const linuxfileModel = new Schema({
  name: String,
  concept: [String],
  content: [String],
  photo: { type: Array, default: null },
});

module.exports = mongoose.model("linuxfile", linuxfileModel);
