import express from "express";
import handleMedInfo from "../controller/medicineInfo.controller.js";

const router = express.Router();

router.get("/:name", handleMedInfo);

export default router;
