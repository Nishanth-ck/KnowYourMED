import mongoose from "mongoose";

const medicineInfoSchema = new mongoose.Schema({
  dosage: { type: String },
  ageGroup: { type: String },
  warnings: { type: String },
  purpose: { type: String },
  sideEffects: { type: String },
  overdosage: { type: String },
  adverseActions: { type: String },
  generalPrecautions: { type: String },
});

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
  medicine_info: {
    type: medicineInfoSchema,
  },
  qrCode: {
    type: String,
  },
  manufacture_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Qr = mongoose.model("qr", qrSchema);

export default Qr;
