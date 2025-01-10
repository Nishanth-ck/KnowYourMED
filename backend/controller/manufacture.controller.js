import Qr from "../model/qr.js";

const handleManufactureGeneratedInfo = async (req, res) => {
  const { manufactureId } = req.body;

  try {
    const value = Qr.find({ manufacture_id: manufactureId });
    res.status(200).json({ value });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

export default handleManufactureGeneratedInfo;
