import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Music, Bookmark } from 'lucide-react';

export default function BottomBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
<<<<<<< HEAD

  // Adds 'is-active' to the className when this tab matches the current URL.
=======
  const currentUser =JSON.parse(localStorage.getItem("user"));
>>>>>>> aa2da32ad4f6608c4010289b4688b104a34e75d3
  function tabClass(path) {
    if (pathname === path) {
      return 'bottom-tab is-active';
    }
    return 'bottom-tab';
  }

  return (
    <div className="bottom-bar">
<<<<<<< HEAD
      <button className={tabClass('/')} onClick={() => navigate('/')}>
        <Home size={22}/>
      </button>

      <button className={tabClass('/music')} onClick={() => navigate('/music')}>
        <Music size={22}/>
      </button>

      <button className={tabClass('/saved')} onClick={() => navigate('/saved')}>
        <Bookmark size={22}/>
      </button>

      <button className={tabClass('/profile')} onClick={() => navigate('/profile')}>
        <div className="profile-avatar">M</div>
      </button>
    </div>
  );
}
=======
      <button className={tabClass('/home')} onClick={() => navigate('/home')}>
        <Home size={22} />
      </button>

      <button className={tabClass('/music')} onClick={() => navigate('/music')}>
        <Music size={22} />
      </button>

      <button className={tabClass('/saved')} onClick={() => navigate('/saved')}>
        <Bookmark size={22} />
      </button>

      <button className={tabClass(`/profile/${currentUser.id}`)}
  onClick={() => navigate(`/profile/${currentUser.id}`)}
>
  <div className="profile-avatar">M</div>
      </button>
    </div>
  );
}
>>>>>>> aa2da32ad4f6608c4010289b4688b104a34e75d3
