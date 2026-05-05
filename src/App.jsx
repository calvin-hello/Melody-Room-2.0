import { Routes, Route } from "react-router-dom";

<<<<<<< HEAD
import Splash from "./components/Splash.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
=======
import Profile from "./Profile.jsx";
import Splash from "./Splash.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Dashboard from "./Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
>>>>>>> 22ab485

import "./App.css";

export default function App() {
  return (
<<<<<<< HEAD
=======

>>>>>>> 22ab485
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
<<<<<<< HEAD
=======

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
>>>>>>> 22ab485
    </Routes>
  );
}