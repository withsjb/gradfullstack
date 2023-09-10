const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("File", fileSchema);
