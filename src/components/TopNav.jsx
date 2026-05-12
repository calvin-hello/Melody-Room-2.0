import React, { useState } from 'react';
import { MessageCircle, Search } from 'lucide-react';

export default function TopNav({ activeTab, setActiveTab }) {
  const [search, setSearch] = useState('');

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
      <nav className="top-nav">
        <div className="top-nav-row">
          <button className="nav-add-btn">＋</button>

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

          <div className="nav-bell">
            <MessageCircle size={22} />
            <span className="nav-bell-dot" />
          </div>
        </div>
      </nav>

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
    </>
  );
}