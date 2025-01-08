import express from "express";
import handleSavePill from "../controller/addPill.controller.js";

const router = express.Router();

router.post("/save-pill", handleSavePill);

export default router;
