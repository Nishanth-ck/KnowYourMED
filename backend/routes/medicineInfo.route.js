import express from "express";
import {
  handleMedInfo,
  handleMedRetrieve,
} from "../controller/medicineInfo.controller.js";

const router = express.Router();

router.get("/:name", handleMedInfo);

router.get("/info/:medId", handleMedRetrieve);

export default router;
