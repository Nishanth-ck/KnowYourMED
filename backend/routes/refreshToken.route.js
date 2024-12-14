import express from "express";
import {
  refreshTokenHandler,
  refreshTokenPharmaHandler,
} from "../controller/refershToken.controller.js";

const router = express.Router();

router.get("/user", refreshTokenHandler);

router.get("/pharmacist", refreshTokenPharmaHandler);

export default router;
