import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Music, Bookmark } from 'lucide-react';

export default function BottomBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const username = localStorage.getItem("username");

  function tabClass(path) {
    if (pathname === path) {
      return 'bottom-tab is-active';
    }
    return 'bottom-tab';
  }

  return (
    <div className="bottom-bar">
      <button className={tabClass('/home')} onClick={() => navigate('/home')}>
        <Home size={22}/>
      </button>

      <button className={tabClass('/music')} onClick={() => navigate('/music')}>
        <Music size={22}/>
      </button>

      <button className={tabClass('/saved')} onClick={() => navigate('/saved')}>
        <Bookmark size={22}/>
      </button>

      <button className={tabClass(`/profile/${username}`)}
  onClick={() => navigate(`/profile/${username}`)}
>
  <div className="profile-avatar">M</div>
      </button>
    </div>
  );
}