import QRCode from "qrcode";
import Qr from "../model/qr.js";

const handleQRCodeGeneration = async (req, res) => {
  const {
    medicine_name,
    expiry_date,
    manufacture_date,
    batch_number,
    manufacture_name,
  } = req.body;

  try {
    const newQr = await Qr.create({
      medicine_name: medicine_name,
      expiry_date: expiry_date,
      manufacture_date: manufacture_date,
      batch_number: batch_number,
      manufacture_name: manufacture_name,
    });

    const result = await newQr.save();

    if (!result) {
      return res.status(401).json({ error: "Try again later!" });
    }

    const text = result._id.toString();

    const qrCode = await QRCode.toDataURL(text, { width: 94 }); // Generate QR code as a base64 string
    res.status(201).json({ qrCode });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};

export default handleQRCodeGeneration;
