import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import handleUserAuth from "./routes/user.auth.route.js";
import handlePharmacistAuth from "./routes/pharmacist.auth.route.js";
import handleRefreshToken from "./routes/refreshToken.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth/user", handleUserAuth);
app.use("/auth/pharmacist", handlePharmacistAuth);
app.use("/refreshToken", handleRefreshToken);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3300;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
