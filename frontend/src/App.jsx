import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./landing_page";
import UserSignup from "./user/user_signup";
import UserLogin from "./user/user_login";
import UserLoginRecover from "./user/user_password_recover";
import UserHomePage from "./user/user_home";
import MaintainPills from "./user/maintain_pills";
import ViewNotifications from "./user/view_notifications";
import MedicineInfo from "./user/medicine_info";
import ManufacturerSignup from "./manufacturer/manufacturer_signup";
import ManufacturerLogin from "./manufacturer/manufacturer_login";
import ManufacturerLoginRecover from "./manufacturer/manufacturer_password_recover";
import ManufacturerHomePage from "./manufacturer/manufacturer_home";
import GenerateQR from "./manufacturer/manufacturer_generateqr";
import ManufacturerViewQR from "./manufacturer/manufacturer_viewqr";
import ContactUsPage from "./contactUs";
import QRCodeScanner from "./user/scan_qr";
import ScanURL from "./scan_url";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/user/recover" element={<UserLoginRecover />} />
        <Route path="/user/home" element={<UserHomePage />} />
        <Route path="/user/maintain-pills" element={<MaintainPills />} />
        <Route path="/user/notifications" element={<ViewNotifications />} />
        <Route path="/user/medicine-info" element={<MedicineInfo />} />
        <Route path="/signup/manufacturer" element={<ManufacturerSignup />} />
        <Route path="/login/manufacturer" element={<ManufacturerLogin />} />
        <Route
          path="/login/manufacturer/recover"
          element={<ManufacturerLoginRecover />}
        />
        <Route path="/manufacturer/home" element={<ManufacturerHomePage />} />
        <Route path="/manufacturer/generate-qr" element={<GenerateQR />} />
        <Route
          path="/manufacturer/view-previous-qr"
          element={<ManufacturerViewQR />}
        />
        <Route path="/user/scan-qr" element={<QRCodeScanner />} />
        <Route path="/medicine/info/:uniqueId" element={<ScanURL />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
