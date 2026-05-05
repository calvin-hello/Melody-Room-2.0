import React from 'react';

// Page shown at /profile — for now uses a hardcoded user (later, fetch from backend with the JWT)
export default function ProfilePage() {
  return (
    <div className="page-section">
      <div className="profile-section">
        {/* Big circular avatar with the letter M */}
        <div className="profile-avatar-large">M</div>

        {/* Username + bio */}
        <p className="profile-name">user.name123</p>
        <p className="profile-bio">Music lover · Indie · Jazz</p>

        {/* Stats row: posts / followers / following */}
        <div className="profile-stats">
          {/*
            Each stat is [value, label]. We map over the array of pairs to avoid repeating the same JSX 3 times.
            `[val, label]` is array-destructuring — pulls the first item into `val`, second into `label`.
          */}
          {[['24', 'Posts'], ['1.2K', 'Followers'], ['318', 'Following']].map(([val, label]) => (
            <div key={label} className="profile-stat">
              <p className="profile-stat-value">{val}</p>
              <p className="profile-stat-label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
