const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  Sender: {
    type: String,
    required: false,
    default:"NA"
  },
  Receiver: {
    type: String,
    required: false,
    default:"NA",
  },
});
const fileModal = mongoose.model("FileShare", fileSchema);
module.exports = fileModal;
