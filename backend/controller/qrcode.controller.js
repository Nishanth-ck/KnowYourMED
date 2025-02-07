import QRCode from "qrcode";
import Qr from "../model/qr.js";
import axios from "axios";
import mongoose from "mongoose";

const handleQRCodeGeneration = async (req, res) => {
  const {
    medicine_name,
    expiry_date,
    manufacture_date,
    batch_number,
    manufacture_name,
    userId,
  } = req.body;

  try {
    // Helper function to get the position of the nth occurrence of a character
    const getNthOccurrence = (str, char, n) => {
      let index = -1;
      for (let i = 0; i < n; i++) {
        index = str.indexOf(char, index + 1);
        if (index === -1) break; // If fewer than n occurrences
      }
      return index;
    };

    // Function to slice text till the 10th full stop
    const sliceText = (text) => {
      if (!text) return "No information available.";
      const index = getNthOccurrence(text, ".", 10);
      return index !== -1 ? text.slice(0, index + 1) : text; // Include the 10th full stop
    };

    const response = await axios.get(
      `http://localhost:3000/medicine/${medicine_name}`
    );

    let medicineInfo = {};

    if (response) {
      medicineInfo = {
        dosage: sliceText(response.data.dosage),
        ageGroup: sliceText(response.data.ageGroup),
        warnings: sliceText(response.data.medicine?.warnings?.[0]),
        purpose: sliceText(response.data.medicine?.purpose?.[0]),
        sideEffects: sliceText(response.data.sideEffects),
        overdosage: sliceText(response.data.medicine?.overdosage?.[0]),
        adverseActions: sliceText(response.data.medicine?.adverseActions?.[0]),
        generalPrecautions: sliceText(
          response.data.medicine?.general_precautions?.[0]
        ),
      };
    }
    // console.log("Med info : ", medicineInfo);

    const newQr = await Qr.create({
      medicine_name: medicine_name,
      expiry_date: expiry_date,
      manufacture_date: manufacture_date,
      batch_number: batch_number,
      manufacture_name: manufacture_name,
      medicine_info: medicineInfo,
      manufacture_id: userId,
    });

    const result = await newQr.save();

    if (!result) {
      return res.status(401).json({ error: "Try again later!" });
    }

    const text =
      "http://localhost:5173/medicine/info/" +
      result._id.toString() +
      "  " +
      "medicine name : " +
      medicine_name +
      " " +
      "expiry date : " +
      expiry_date;

    // console.log(text);
    // console.log();

    const QRid = result?._id.toString();
    const qrCode = await QRCode.toDataURL(text, { width: 94 }); // Generate QR code as a base64 string

    try {
      const objectId = new mongoose.Types.ObjectId(QRid);
      const response2 = await Qr.findOneAndUpdate(
        { _id: objectId },
        { $set: { qrCode: qrCode } },
        { new: true }
      );

      res.status(201).json({ qrCode });
    } catch (err) {
      console.log(err);
      res.status(201).json({ qrCode });
    }
    // res.status(201).json({ qrCode });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};

export default handleQRCodeGeneration;
