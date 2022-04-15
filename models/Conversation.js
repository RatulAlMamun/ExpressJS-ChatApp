// dependencies
const mongoose = require("mongoose");

// Conversation Schema
const conversationSchema = mongoose.Schema(
  {
    creator: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    participant: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    last_update: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// creating model for conversation
const Conversation = mongoose.model("Conversation", conversationSchema);

// module exports
module.exports = Conversation;
