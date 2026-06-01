const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  userId: String,
  messages: [
    {
      role: String, // user / assistant
      content: String,
    },
  ],
  points: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    default: "principiante",
  },
});

module.exports = mongoose.model("ChatHistory", ChatSchema);