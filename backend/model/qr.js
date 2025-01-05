import mongoose from "mongoose";

const qrSchema = new mongoose.Schema({
  medicine_name: {
    type: String,
  },
  expiry_date: {
    type: String,
  },
  manufacture_date: {
    type: String,
  },
  batch_number: {
    type: String,
  },
  manufacture_name: {
    type: String,
  },
});

const Qr = mongoose.model("qr", qrSchema);

export default Qr;
