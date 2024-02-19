import { Routes, Route  } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "./App.css"
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import HomePage from './pages/HomePage/HomePage'


function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />}/ >
        <Route path="/register" element={<RegisterPage />}/ >
        <Route path="/" element={<HomePage />}/ >

      </Routes>
    </>
  )
}

export default App
