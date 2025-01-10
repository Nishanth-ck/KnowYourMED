import Pill from "../model/pill.js";

const handleSavePill = async (req, res) => {
  const { pillName, dosage, times, duration, notify, date, userId } = req.body;

  try {
    const timeOne = times[0] ? times[0] : "";
    const timeTwo = times[1] ? times[1] : "";
    const timeThree = times[2] ? times[2] : "";
    const newPill = await Pill.create({
      pill_name: pillName,
      dosage: dosage,
      time1: timeOne,
      time2: timeTwo,
      time3: timeThree,
      duration: duration,
      notification: notify,
      date: date,
      user: userId,
    });

    const result = await newPill.save();

    if (!result) {
      return res.status(500).json({ error: "Try again later" });
    }

    res.status(201).json({ message: "Done", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleGetPill = async (req, res) => {
  const { pillId } = req.body;

  try {
    const value = await Pill.find({ user: pillId });

    console.log(value);

    res.status(200).json({ message: "done", value });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

export { handleSavePill, handleGetPill };
