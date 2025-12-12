
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from './store/authStore';
import { useEffect } from 'react';
import MakeAppointment from './pages/MakeAppointment';

function App() {

//  const loadUser = useAuthStore((s) => s.loadUser);

//   useEffect(() => {
//     loadUser();     // 👈 COOKIE SE USER LOAD
//   }, []);
  return (
    <>
  
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/make-appointment"
                    element={
                        <ProtectedRoute>
                            <MakeAppointment/>
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Login />} />
            </Routes>
    
    </>
  )
}

export default App
