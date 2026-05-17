import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Splash from "./components/Splash.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";
import Home from "./pages/Home.jsx";
import Music from "./pages/Music.jsx";
import Saved from "./pages/Saved.jsx";
import ListenPage from "./pages/ListenPage.jsx";

import "./styles/App.css";
import "./styles/style.css";

import TopNav from "./components/TopNav.jsx";
import BottomBar from "./components/BottomBar.jsx";

// Wrapper that owns the Following / For You tab state and passes it
// to BOTH TopNav (so the buttons work) and Home (so the feed knows which tab).
function HomeWithTabs() {
  const [activeTab, setActiveTab] = useState("foryou");
  return (
    <div className="app-shell">
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="page-content">
        <Home activeTab={activeTab} />
      </main>
      <BottomBar />
    </div>
  );
}

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
            <HomeWithTabs />
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

      <Route
        path="/music"
        element={
          <ProtectedRoute>
            <div className="app-shell">
              <TopNav />
              <main className="page-content">
                <Music />
              </main>
              <BottomBar />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/saved"
        element={
          <ProtectedRoute>
            <div className="app-shell">
              <TopNav />
              <main className="page-content">
                <Saved />
              </main>
              <BottomBar />
            </div>
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

      <Route path="/listen/:type/:id" element={<Listen />} />
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