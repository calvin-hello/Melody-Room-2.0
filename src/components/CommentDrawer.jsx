import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUp, X } from 'lucide-react';

// This file makes the pop-up that slides up when you tap the comment icon on a post.
// It shows the list of comments and lets the user type a new one.
export default function CommentDrawer({ onClose, post, comments }) {
  const [draft, setDraft] = useState('');

  if (!comments) {
    comments = [];
  }

// This block stops the page behind the drawer from scrolling while the drawer is open, and 
// lets it scroll again when the drawer closes.
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

// This function runs when the user submits a comment 
// (either by pressing Enter or tapping the send button).This function runs when the user 
// submits a comment (either by pressing Enter or tapping the send button).
  function handleSend(e) {
    e.preventDefault();
    if (draft.trim() === '') return;
    setDraft('');
  }

  return createPortal(
    <>
      <div onClick={onClose} className="comment-backdrop" />

      <div className="comment-drawer">
        <button onClick={onClose} className="drawer-handle-wrap" aria-label="Close comments">
          <span className="drawer-handle" />
        </button>

        <div className="comment-header">
          <h2>Comments</h2>
          <button
            type="button"
            onClick={onClose}
            className="comment-close-btn"
            aria-label="Close comments"
          >
            <X size={20} />
          </button>
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
            onChange={(e) => setDraft(e.target.value)}
          />

          <button
            type="submit"
            className="comment-send-btn"
            disabled={draft.trim() === ''}
            aria-label="Send comment"
          >
            <ArrowUp size={18}/>
          </button>
        </form>
      </div>
    </>,
    document.body
  );
}
