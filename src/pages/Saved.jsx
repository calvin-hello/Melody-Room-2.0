// React import — required in any file that uses JSX (the <tag> syntax)
import React from 'react';

// Page component for /saved — placeholder "empty state" since the feature isn't built yet
export default function SavedPage() {
  return (
    // .empty-state is centered column layout (defined in style.css)
    <div className="empty-state">
      <span className="empty-icon">🔖</span>          {/* big bookmark emoji */}
      <h2 className="empty-title">Saved Posts</h2>    {/* section heading   */}
      <p className="empty-text">Posts you save will appear here.</p>
    </div>
  );
}
