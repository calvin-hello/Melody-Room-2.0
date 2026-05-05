import React, { useState } from 'react';
import CommentDrawer from './CommentDrawer';

// --- Icons ---
function HeartIcon({ filled }) {
  // If filled is true, show solid red heart. Otherwise just outline.
  const fill = filled ? 'currentColor' : 'none';
  return (
    <svg className="post-action-icon" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg className="post-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="post-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg className="post-avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

// --- The action buttons row (heart, comment, share) ---
// Pulled out so we don't repeat the same buttons twice in the main component.
function ActionButtons({ liked, onLikeClick, onCommentClick }) {
  // Build the heart button class
  let heartClass = 'post-action-btn';
  if (liked) {
    heartClass = heartClass + ' is-liked';
  }

  return (
    <div className="post-actions">
      <button onClick={onLikeClick} className={heartClass} aria-label="Like">
        <HeartIcon filled={liked} />
      </button>
      <button onClick={onCommentClick} className="post-action-btn" aria-label="Comment">
        <CommentIcon />
      </button>
      <button className="post-action-btn" aria-label="Share">
        <ShareIcon />
      </button>
    </div>
  );
}

// --- Main component ---
export default function PostCard({ post, style }) {
  // State: each post tracks its own like / expanded / drawer status
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Helper handlers (instead of inline arrow functions in JSX)
  function handleLike() {
    setLiked(!liked);
  }
  function handleOpenComments() {
    setShowComments(true);
  }
  function handleCloseComments() {
    setShowComments(false);
  }
  function handleToggleExpanded() {
    setExpanded(!expanded);
  }

  // Useful flags
  const isBlog = post.type === 'blog';
  const hasImage = post.imageUrl && !isBlog;

  // Username with a fallback if missing
  let username = 'user.name123';
  if (post.author) {
    username = post.author;
  }

  // --- Header section: image with overlay OR plain header ---
  let header;
  if (hasImage) {
    header = (
      <div className="post-image-wrap">
        <img className="post-image" src={post.imageUrl} alt={post.title} loading="lazy" />
        <div className="post-image-overlay">
          <div className="post-avatar"><PersonIcon /></div>
          <p className="post-image-title">{post.title}</p>
        </div>
      </div>
    );
  } else {
    header = (
      <div className="post-header">
        <div className="post-avatar"><PersonIcon /></div>
        <p className="post-title">{post.title}</p>
      </div>
    );
  }

  // --- Caption / body section ---
  let body;
  if (isBlog) {
    // Blog: split caption into paragraphs and render each one
    const lines = [];
    if (post.caption) {
      const split = post.caption.split('\n');
      for (let i = 0; i < split.length; i++) {
        if (split[i].length > 0) {
          lines.push(split[i]);
        }
      }
    }

    body = (
      <>
        <p className="post-username" style={{ marginTop: 4, marginBottom: 4 }}>{username}</p>
        <div className="post-blog-body">
          {lines.map(function (line, i) {
            return <p key={i}>{line}</p>;
          })}
        </div>
        <div className="post-blog-actions">
          <ActionButtons
            liked={liked}
            onLikeClick={handleLike}
            onCommentClick={handleOpenComments}
          />
        </div>
      </>
    );
  } else {
    // Image post: short caption with optional "more" toggle
    const caption = post.caption || '';
    const isLong = caption.length > 100;

    // Decide what text to show
    let captionText;
    if (expanded || !isLong) {
      captionText = caption;
    } else {
      captionText = caption.slice(0, 100) + '...';
    }

    // The "more" / "less" toggle button (only if caption is long)
    let toggleButton = null;
    if (isLong) {
      let label = 'more';
      if (expanded) {
        label = 'less';
      }
      toggleButton = (
        <button onClick={handleToggleExpanded} className="post-caption-toggle">
          {label}
        </button>
      );
    }

    body = (
      <>
        <div className="post-meta-row">
          <p className="post-username">{username}</p>
          <ActionButtons
            liked={liked}
            onLikeClick={handleLike}
            onCommentClick={handleOpenComments}
          />
        </div>
        <p className="post-caption">
          {captionText}
          {toggleButton}
        </p>
      </>
    );
  }

  // --- Render ---
  return (
    <div className="post-card" style={style}>
      {header}
      <div className="post-footer">{body}</div>
      <CommentDrawer
        open={showComments}
        onClose={handleCloseComments}
        post={post}
      />
    </div>
  );
}
