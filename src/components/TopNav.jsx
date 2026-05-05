import React, { useState } from 'react';

// TopNav receives the activeTab value + setter as props from App.jsx.
// "Lifting state up" pattern: the state lives in App.jsx so both TopNav AND Home can share it.
export default function TopNav({ activeTab, setActiveTab }) {
  // Local state for the search box. Only TopNav uses this, so it stays here (not lifted up).
  const [search, setSearch] = useState('');

  return (
    // <> </> is a "Fragment" — lets us return multiple elements without an extra wrapper div
    <>
      {/* Top navigation bar (sticky at top of screen) */}
      <nav className="top-nav">
        <div className="top-nav-row">
          {/* Plus button — would open a "new post" screen in a full app */}
          <button className="nav-add-btn">＋</button>

          {/* Following | For You tab switcher */}
          <div className="nav-tabs">
            <button
              onClick={() => setActiveTab('following')}                          // tells App.jsx to switch tabs
              className={`tab-btn${activeTab === 'following' ? ' is-active' : ''}`}
            >
              Following
              {/* Conditional rendering: only show the underline when this tab is active */}
              {activeTab === 'following' && <span className="tab-underline" />}
            </button>
            <span className="tab-divider">|</span>
            <button
              onClick={() => setActiveTab('foryou')}
              className={`tab-btn${activeTab === 'foryou' ? ' is-active' : ''}`}
            >
              For You
              {activeTab === 'foryou' && <span className="tab-underline" />}
            </button>
          </div>

          {/* Notification bell + small purple dot indicator */}
          <div className="nav-bell">
            <svg className="nav-bell-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <span className="nav-bell-dot" />
          </div>
        </div>
      </nav>

      {/* Search bar (sticky just below the nav) */}
      <div className="search-wrapper">
        <div className="search-relative">
          {/* Magnifying glass icon — positioned absolutely, sits on top of the input */}
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            // Placeholder text changes based on which tab is active (ternary: condition ? a : b)
            placeholder={activeTab === 'foryou' ? 'Search anything posts...' : 'Search anything music...'}
            // Controlled input: React state owns the value; every keystroke fires onChange
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
