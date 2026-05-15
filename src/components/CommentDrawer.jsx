import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send } from 'lucide-react';

export default function CommentDrawer({ open, onClose, post, comments: initialComments }) {
  // What the user is currently typing in the input box
  const [draft, setDraft] = useState('');

  // The list of comments we are actually showing.
  // Starts from whatever the parent passed in (or an empty list),
  // then grows when the user submits a new one.
  const [comments, setComments] = useState(initialComments || []);

  // Stops the page behind the drawer from scrolling while open,
  // lets it scroll again when the drawer closes.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  if (!open) {
    return null;
  }

  // This runs when the user clicks the send button or hits Enter
  function handleSend(e) {
    // Stop the page from reloading (that's what forms do by default)
    e.preventDefault();

    // Take what the user typed and remove extra spaces at the start/end
    const text = draft.trim();

    // If they didn't actually type anything, do nothing
    if (text === '') return;

    // Now we need to know WHO is posting this comment.
    // We'll start with "You" as a backup name.
    let author = 'You';

    // Try to find the logged-in user's name from the browser's memory
    try {
      // The browser saved the user as text — turn it back into an object
      const user = JSON.parse(localStorage.getItem('user'));

      // If we found a user and they have a username, use it
      if (user && user.username) {
        author = user.username;
      }
    } catch (err) {
      // If something went wrong (no user logged in), just keep "You"
    }

    // Make a new comment object with the name and the text
    const newComment = { author, text };

    // Add the new comment to the end of the comments list
    setComments([...comments, newComment]);

    // Empty the input box so the user can type a new comment
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
            <Send size={18}/>
          </button>
        </form>
      </div>
    </>,
    document.body
  );
}
