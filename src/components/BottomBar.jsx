import React from 'react';
// useNavigate = function to programmatically change the URL.
// useLocation = read the current URL.
import { useNavigate, useLocation } from 'react-router-dom';

// --- SVG icon components ---
// Each one is a tiny component returning an inline SVG.
// Using `stroke="currentColor"` lets the icon's color be controlled by CSS `color` from the parent.
const HomeIcon = () => (
  <svg className="bottom-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const MusicIcon = () => (
  <svg className="bottom-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
  </svg>
);
const SaveIcon = () => (
  <svg className="bottom-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

// The persistent navigation bar at the bottom of every page
export default function BottomBar() {
  const navigate = useNavigate();          // call navigate('/some-path') to switch pages
  const { pathname } = useLocation();      // current URL path, e.g. "/music"

  // Define each tab as { path, icon }. profile uses null because we render an avatar circle instead of an icon.
  const items = [
    { path: '/',        icon: <HomeIcon /> },
    { path: '/music',   icon: <MusicIcon /> },
    { path: '/saved',   icon: <SaveIcon /> },
    { path: '/profile', icon: null },
  ];

  return (
    <div className="bottom-bar">
      {/* Render one button per tab using .map() */}
      {items.map(({ path, icon }) => {
        // Compare the tab's path to the current URL — if they match, this tab is active
        const active = pathname === path;
        return (
          <button
            key={path}
            // Clicking changes the URL → React Router renders the matching <Route> in App.jsx
            onClick={() => navigate(path)}
            // Apply 'is-active' class only when active — the CSS turns active icons purple
            className={`bottom-tab${active ? ' is-active' : ''}`}
          >
            {/* If icon is null (profile tab), render the avatar circle with the letter M instead */}
            {icon ?? (
              <div className={`profile-avatar${active ? ' is-active' : ''}`}>M</div>
            )}
          </button>
        );
      })}
    </div>
  );
}
