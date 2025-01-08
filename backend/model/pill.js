import mongoose from "mongoose";

const pillSchema = new mongoose.Schema({
  pill_name: {
    type: String,
    required: true, // Ensures this field is mandatory
    trim: true, // Removes extra whitespace
  },
  dosage: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
  notification: {
    type: Boolean,
    default: true, // Sets a default value if not provided
  },
});

const Pill = mongoose.model("pill", pillSchema);

export default Pill;
