import express from "express";
import handleManufactureGeneratedInfo from "../controller/manufacture.controller.js";

const router = express.Router();

router.post("/generated-qr", handleManufactureGeneratedInfo);

export default router;
