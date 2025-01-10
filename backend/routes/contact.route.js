import express from "express";
import handleContactPage from "../controller/contact.controller.js";

const router = express.Router();

router.post("/feedback", handleContactPage);

export default router;
