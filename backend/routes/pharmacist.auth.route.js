import express from "express";
import {
  handlePharmacistLogin,
  handlePharmacistLogout,
  handlePharmacistRegister,
  handlePharmacistEmail,
  handlePharmacistPassswordReset,
} from "../controller/pharmacist.auth.controller.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/register", handlePharmacistRegister);

router.post("/email-verification", handlePharmacistEmail);

router.post("/password-reset", handlePharmacistPassswordReset);

router.post("/login", handlePharmacistLogin);

router.get("/logout", verifyJWT, handlePharmacistLogout);

export default router;
