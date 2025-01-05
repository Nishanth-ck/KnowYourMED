import express from "express";
import handleUserNotify from "../controller/notify.controller.js";

const router = express.Router();

router.post("/", handleUserNotify);

export default router;
