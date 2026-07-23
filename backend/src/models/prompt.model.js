const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content:{
        type: String,
        required: true
    },
    category: {
        type: String,
        enum:  ["Marketing", "Coding", "Design", "Writing","Instagram", "Other"],
        default: "Other"
    },
    tags: [
      {
        type: String,
      },
    ],
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const promptModel = mongoose.model("Prompt", promptSchema);

module.exports = promptModel;