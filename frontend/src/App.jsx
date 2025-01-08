import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSignup from "./user_signup";
import UserLogin from "./user_login";
import ManufacturerSignup from "./manufacturer_signup";
import ManufacturerLogin from "./manufacturer_login";
import HomePage from "./home_page";
import MaintainPills from "./maintain_pills";
import UserNotifications from "./user-notifications";
import MedicineInfo from "./medicine_info";
import GenerateQR from "./generate_qr";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/signup/manufacturer" element={<ManufacturerSignup />} />
        <Route path="/login/manufacturer" element={<ManufacturerLogin />} />
        <Route path="/user/home" element={<HomePage />} />
        <Route path="/user/maintain-pills" element={<MaintainPills />} />
        <Route path="/user/notifications" element={<UserNotifications />} />
        <Route path="/user/medicine-info" element={<MedicineInfo />} />
        <Route path="/user/generate-qr" element={<GenerateQR />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
