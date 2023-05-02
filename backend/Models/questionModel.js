const mongoose = require("mongoose");

const questionModel = new mongoose.Schema({
  questions: { type: Array, default: [] },
  text: {
    type: Array,
    default: [],
  },

  answers: { type: Array, default: [] },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", questionModel);
