import express from "express";
import {
  handleSavePill,
  handleGetPill,
} from "../controller/addPill.controller.js";

const router = express.Router();

router.post("/save-pill", handleSavePill);

router.post("/get-pill", handleGetPill);

export default router;
