import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import handleUserAuth from "./routes/user.auth.route.js";
import handlePharmacistAuth from "./routes/pharmacist.auth.route.js";
import handleRefreshToken from "./routes/refreshToken.route.js";
import handleTranslation from "./routes/translate.route.js";
// import handleNotify from "./routes/notify.route.js";
import handleQrCode from "./routes/qrcode.route.js";
import handleMedicineInfo from "./routes/medicineInfo.route.js";
import handlePill from "./routes/addPill.route.js";
import handleManufactureInfo from "./routes/manufacture.route.js";
import handleContact from "./routes/contact.route.js";

dotenv.config();
const app = express();

// const corsOptions = {
//   methods: ["GET", "POST"],
//   allowedHeaders: "Content-Type,Authorization",
//   credentials: true,
//   origin: function (origin, callback) {
//     const allowedOrigins = [
//       "https://know-your-med-lake.vercel.app",
//       "https://know-your-medicine.vercel.app",
//       "https://www.know-your-medicine.vercel.app",
//     ];

//     if (!origin) return callback(null, true);

//     const allowed = allowedOrigins.some((allowedOrigin) =>
//       origin.startsWith(allowedOrigin)
//     );

//     if (allowed) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   maxAge: 86400,
// };

const corsOptions = {
  method: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
  origin: "http://localhost:5173",
  maxAge: 86400,
};

app.use(cors(corsOptions));

// app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth/user", handleUserAuth);
app.use("/auth/manufacture", handlePharmacistAuth);
app.use("/refreshToken", handleRefreshToken);
app.use("/translate", handleTranslation);
// app.use("/notify", handleNotify);
app.use("/generate-qr", handleQrCode);
app.use("/medicine", handleMedicineInfo);
app.use("/maintain", handlePill);
app.use("/manufacture", handleManufactureInfo);
app.use("/contact", handleContact);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;

if (!process.env.MONGO_URL) {
  console.error("MONGO_URL is not defined in environment variables!");
}

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

// const corsOptions = {
//   methods: ["GET", "POST"],
//   allowedHeaders: "Content-Type,Authorization",
//   credentials: true,
//   origin: [
//     "https://know-your-med-lake.vercel.app",
//     "https://know-your-medicine.vercel.app",
//     "https://www.know-your-medicine.vercel.app",
//   ],
//   maxAge: 86400,
// };

// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://know-your-med-lake.vercel.app"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });
// origin: function (origin, callback) {
//     const allowedOrigins = [
//       "https://know-your-med-lake.vercel.app",
//       "https://know-your-medicine.vercel.app",
//       "https://www.know-your-medicine.vercel.app",
//     ];

//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
