import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TopNav from './src/components/TopNav.jsx';
import BottomBar from './src/components/BottomBar.jsx';
import Home from './src/pages/Home.jsx';
import MusicPage from './src/pages/Music.jsx';
import SavedPage from './src/pages/Saved.jsx';
import ProfilePage from './src/pages/Profile.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('foryou');

  return (
    <BrowserRouter>
      <div className="app-shell">
        <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home activeTab={activeTab} />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

        <BottomBar />
      </div>
    </BrowserRouter>
  );
}