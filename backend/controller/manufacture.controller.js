import Qr from "../model/qr.js";

const handleManufactureGeneratedInfo = async (req, res) => {
  const { userId } = req.body;

  console.log(userId);

  try {
    const value = Qr.find({ manufacture_id: userId });
    res.status(200).json({ value });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

export default handleManufactureGeneratedInfo;
