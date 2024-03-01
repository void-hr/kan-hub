import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import SettingPage from "./pages/SettingPage/SettingPage";
import AnalyticsPage from "./pages/AnalyticsPage/AnalyticsPage";
import { Toaster } from "react-hot-toast";
import SharedTaskPage from "./pages/SharedTaskPage/SharedTaskPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/:cardId" element={<SharedTaskPage />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#F6FFF9",
              border: "1px solid #48C1B5",
              color: "black",
              padding: "12px 24px",
              textAlign: "center",
            },
            icon: false,
          },
          error: {
            style: {
              border: "1px solid #CF3636",
              color: "#CF3636",
              padding: "12px 24px",
              textAlign: "center",
            },
            icon: false,
          },
        }}
      />
    </>
  );
}

export default App;
