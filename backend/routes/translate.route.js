import express from "express";
import handleTranslationToKannada from "../controller/translate.controller.js";

const router = express.Router();

router.post("/", handleTranslationToKannada);

export default router;
