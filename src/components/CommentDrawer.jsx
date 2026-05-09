import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send } from 'lucide-react';

// A bottom-sheet that slides up showing comments for a post.
export default function CommentDrawer({ open, onClose, post, comments }) {
  const [draft, setDraft] = useState('');

  // If no comments were passed in, default to an empty list.
  if (!comments) {
    comments = [];
  }

  // Lock background scroll while the drawer (comment section) is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  // If not open, render nothing.
  if (!open) {
    return null;
  }

  function handleSend(e) {
    e.preventDefault();
    if (draft.trim() === '') {
      return;
    }
    // (In a real app, send the comment to the backend here)
    setDraft('');
  }

  // We use the createPortal so that the drawer renders into <body> instead of ->
  // -> inside the post card.
  // (This is needed because the post card has a CSS transform that would trap a fixed-position child.)
  return createPortal(
    <>
      <div onClick={onClose} className="comment-backdrop" />

      <div className="comment-drawer">
        <button onClick={onClose} className="drawer-handle-wrap" aria-label="Close comments">
          <span className="drawer-handle" />
        </button>

        <div className="comment-header">
          <h2>Comments</h2>
        </div>

        <div className="comment-list">
          {comments.length === 0 && (
            <div className="comment-empty">No comments yet — be the first.</div>
          )}

          {comments.map((c, i) => (
            <div key={i} className="comment-item">
              <div className="comment-avatar">
                {c.author ? c.author[0].toUpperCase() : 'U'}
              </div>
              <div>
                <p className="comment-author">{c.author}</p>
                <p className="comment-text">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="comment-form">
          <input
            type="text"
            className="comment-input"
            placeholder="Comment"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}/>
          <button
            type="submit"
            className="comment-send-btn"
            disabled={draft.trim() === ''}
            aria-label="Send comment">
            <Send size={18}/>
          </button>
        </form>
      </div>
    </>,
    document.body
  );
}