import Qr from "../model/qr.js";
import { stringify } from "flatted";

const handleManufactureGeneratedInfo = async (req, res) => {
  const { userId } = req.body;

  try {
    const value = await Qr.find({ manufacture_id: userId });
    // res.status(200).json(stringify(value));
    res.status(200).json({ value });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

export default handleManufactureGeneratedInfo;
