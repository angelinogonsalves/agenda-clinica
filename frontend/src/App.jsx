import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PatientPage from "./pages/PatientPage";
import AdminPage from "./pages/AdminPage";
import AdminSchedulesPage from "./pages/AdminSchedulesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/paciente" element={<PatientPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/horarios" element={<AdminSchedulesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
