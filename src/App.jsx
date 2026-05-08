import { Routes, Route } from "react-router-dom";

import Splash from "./components/Splash.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";
import "./styles/App.css";

export default function App() {
  return (
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

      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}