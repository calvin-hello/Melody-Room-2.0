import React, { useState, useEffect } from 'react';
// createPortal renders this component OUTSIDE its parent in the DOM tree.
// Needed here because PostCard has a CSS `transform` which would otherwise trap our `position: fixed` drawer.
import { createPortal } from 'react-dom';

// Send-arrow icon for the "post comment" button
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// Bottom-sheet that slides up showing comments for a post.
// Props: open (bool), onClose (function), post (object), comments (array — defaults to []).
export default function CommentDrawer({ open, onClose, post, comments = [] }) {
  // Local state for the input box (the comment the user is typing)
  const [draft, setDraft] = useState('');

  // useEffect runs side effects (things outside React: document, timers, fetches, etc.)
  // This one locks page scroll while the drawer is open and unlocks it on close.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Cleanup function — runs when `open` becomes false OR when component unmounts
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]); // re-run this effect only when `open` changes

  // Early return: if the drawer isn't open, render nothing
  if (!open) return null;

  // Form submit handler — would send the comment to the backend in a real app
  const handleSend = (e) => {
    e.preventDefault();              // stop the browser from reloading the page
    if (!draft.trim()) return;       // don't submit empty comments
    setDraft('');                    // clear the input
  };

  // createPortal(children, targetDOMNode) — moves these elements into <body>
  return createPortal(
    <>
      {/* Backdrop — clicking anywhere outside the drawer closes it */}
      <div onClick={onClose} className="comment-backdrop" />

      {/* The drawer itself — slides up from the bottom (animation defined in style.css) */}
      <div className="comment-drawer">
        {/* Drag handle at the top — also acts as a close button */}
        <button onClick={onClose} aria-label="Close comments" className="drawer-handle-wrap">
          <span className="drawer-handle" />
        </button>

        <div className="comment-header">
          <h2>Comments</h2>
        </div>

        {/* Scrollable list of comments */}
        <div className="comment-list">
          {comments.length === 0 ? (
            // Empty state — shown when there are no comments yet
            <div className="comment-empty">No comments yet — be the first.</div>
          ) : (
            // Otherwise render one row per comment
            comments.map((c, i) => (
              <div key={i} className="comment-item">
                <div className="comment-avatar">
                  {/* First letter of the author's name as the avatar fallback */}
                  {c.author?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <div>
                  <p className="comment-author">{c.author}</p>
                  <p className="comment-text">{c.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment input form — pinned to the bottom of the drawer */}
        <form onSubmit={handleSend} className="comment-form">
          <input
            type="text"
            className="comment-input"
            value={draft}                                  // controlled input: React owns the value
            onChange={e => setDraft(e.target.value)}       // update state on every keystroke
            placeholder="Comment"
          />
          <button
            type="submit"
            className="comment-send-btn"
            aria-label="Send comment"
            disabled={!draft.trim()}                       // grey out when empty
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </>,
    document.body                                          // portal target — render into <body>
  );
}
