import { Routes, Route  } from 'react-router-dom'
import "./App.css"
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import HomePage from './pages/HomePage/HomePage'
import SettingPage from './pages/SettingPage/SettingPage'
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage'
import  { Toaster } from 'react-hot-toast';


function App() {
  
  return (
      <>
      <Routes>
        <Route path="/login" element={<LoginPage />}/ >
        <Route path="/register" element={<RegisterPage />}/ >
        <Route path="/" element={<HomePage />}/ >
        <Route path="/settings" element={<SettingPage />}/ >
        <Route path="/analytics" element={<AnalyticsPage />}/ >

      </Routes>
      <Toaster   position="top-right"  reverseOrder={false}/>
    </>
  )
}

export default App
