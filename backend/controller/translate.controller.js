import translate from "google-translate-api-x";

const handleTranslationToKannada = async (req, res) => {
  const info = req.body.text;

  try {
    const result = await translate(`${info}`, {
      from: "en",
      to: "kn",
    });

    return res.status(200).json({
      translatedText: result.text,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

export default handleTranslationToKannada;
