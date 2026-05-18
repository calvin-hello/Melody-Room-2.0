import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, Search, Wifi, BatteryFull, SignalHigh } from 'lucide-react';

function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-time">9:41</span>

      <div className="status-icons">
        <SignalHigh size={16} />
        <Wifi size={16} />
        <BatteryFull size={18} />
      </div>
    </div>
  );
}


export default function TopNav({ activeTab, setActiveTab }) {
  const [search, setSearch] = useState('');
  const location = useLocation();

  // Is the user currently on the profile page?
  const isProfilePage = location.pathname.startsWith('/profile');

  // If we're on the profile page, get the logged-in user's @handle
  let profileHandle = '';
  if (isProfilePage) {
    const saved = localStorage.getItem('user');
    if (saved) {
      const user = JSON.parse(saved);
      profileHandle = '@' + (user.username || '');
    }
  }

  let followingClass = 'tab-btn';
  if (activeTab === 'following') {
    followingClass = 'tab-btn is-active';
  }

  let foryouClass = 'tab-btn';
  if (activeTab === 'foryou') {
    foryouClass = 'tab-btn is-active';
  }

  let placeholder = 'Search anything music...';
  if (activeTab === 'fory ou') {
    placeholder = 'Search anything posts...';
  }

  return (
    <>
      <StatusBar />
      <nav className="top-nav">
        <div className="top-nav-row">
          <button className="nav-add-btn">＋</button>

          {/* On the profile page, show "My Profile" + the user's @handle
              instead of the Following / For You tabs */}
          {isProfilePage ? (
            <div className="nav-title">
              <h2 className="nav-title-text">My Profile</h2>
              <p className="nav-title-sub">{profileHandle}</p>
            </div>
          ) : (
            <div className="nav-tabs">
              <button className={followingClass} onClick={() => setActiveTab('following')}>
                Following
                {activeTab === 'following' && <span className="tab-underline" />}
              </button>

              <span className="tab-divider">|</span>

              <button className={foryouClass} onClick={() => setActiveTab('foryou')}>
                For You
                {activeTab === 'foryou' && <span className="tab-underline" />}
              </button>
            </div>
          )}

          <div className="nav-bell">
            <MessageCircle size={22} />
            <span className="nav-bell-dot" />
          </div>
        </div>
      </nav>

      {/* Hide the search bar on the profile page */}
      {!isProfilePage && (
        <div className="search-wrapper">
          <div className="search-relative">
            <Search className="search-icon" size={18} color="#ffffff" />
            <input
              type="text"
              className="search-input"
              placeholder={placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              readOnly
              onClick={() => window.location.href = '/search'}
            />
          </div>
        </div>
      )}
    </>
  );
}