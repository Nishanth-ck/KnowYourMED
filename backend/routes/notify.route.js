import express from "express";
import { handleUserNotify } from "../controller/notify.controller.js";

const router = express.Router();

router.post("/email", handleUserNotify);

// router.post("/sms", smsController);

export default router;
