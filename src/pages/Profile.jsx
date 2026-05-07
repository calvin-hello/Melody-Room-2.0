import React from 'react';

export default function ProfilePage() {
  return (
    <div className="page-section">
      <div className="profile-section">
        <div className="profile-avatar-large">M</div>

        <p className="profile-name">user.name123</p>
        <p className="profile-bio">Music lover · Indie · Jazz</p>

        <div className="profile-stats">
          <div>
            <p className="profile-stat-value">24</p>
            <p className="profile-stat-label">Posts</p>
          </div>
          <div>
            <p className="profile-stat-value">1.2K</p>
            <p className="profile-stat-label">Followers</p>
          </div>
          <div>
            <p className="profile-stat-value">318</p>
            <p className="profile-stat-label">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
}
