import express from "express";
import handleQRCodeGeneration from "../controller/qrcode.controller.js";

const router = express.Router();

router.post("/", handleQRCodeGeneration);

export default router;
