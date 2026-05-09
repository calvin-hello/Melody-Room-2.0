import { Routes, Route } from "react-router-dom";

import Splash from "./components/Splash.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";

import "./styles/App.css";
import "./styles/style.css";

import TopNav from "./components/TopNav.jsx";
import BottomBar from "./components/BottomBar.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <div className="app-shell">
              <TopNav />
              <main className="page-content">
                <Home />
              </main>
              <BottomBar />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <div className="app-shell">
              <TopNav />
              <main className="page-content">
                <Profile />
              </main>
              <BottomBar />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}


// import { Routes, Route } from "react-router-dom";

// import Splash from "./components/Splash.jsx";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import ProtectedRoute from "./routes/ProtectedRoute.jsx";
// import Profile from "./pages/Profile.jsx";
// import Home from "./pages/Home.jsx";
// import "./styles/App.css";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Splash />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Signup />} />

//       <Route
//         path="/home"
//         element={
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }