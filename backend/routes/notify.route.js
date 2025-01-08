import express from "express";
import {
  handleUserNotify,
  smsController,
} from "../controller/notify.controller.js";

const router = express.Router();

router.post("/", handleUserNotify);

router.post("/", smsController);

export default router;
