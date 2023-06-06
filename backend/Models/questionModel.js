const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionModel = new Schema({
  questions: { type: Array, default: [] }, // create question with [] default value
  answers: { type: Array, default: [] },
  photo: { type: Array, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", questionModel);
