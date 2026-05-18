import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send } from 'lucide-react';

// The address of our backend (the place where comments are saved)
const API = 'http://localhost:5000/api/comments';


// Gets the logged-in user's name out of the browser.
// If nobody is logged in, just uses "You" as the name.
function getAuthor() {
  const savedUser = localStorage.getItem('user');

  if (savedUser === null) {
    return 'You';
  }

  const user = JSON.parse(savedUser);
  if (user.username) {
    return user.username;
  }
  return 'You';
}


export default function CommentDrawer({ open, onClose, post }) {
  // Three pieces of "memory" the drawer keeps track of:
  const [draft, setDraft] = useState('');         // what the user is typing
  const [comments, setComments] = useState([]);   // the list of comments to show
  const [error, setError] = useState('');         // error message (if something fails)


  // Runs when the drawer opens or closes.
  // Job 1: stop the page from scrolling while the drawer is open.
  // Job 2: when it opens, ask the backend for this post's comments.
  useEffect(() => {

    // If the drawer is closed, just allow scrolling and stop here
    if (open === false) {
      document.body.style.overflow = '';
      return;
    }

    // Drawer is open — freeze the page
    document.body.style.overflow = 'hidden';

    // Ask the backend for the comments for this post
    loadComments();

  }, [open, post]);


  // Goes to the backend and fetches the comments for this post.
  // If the backend isn't running, just show an empty list.
  async function loadComments() {
    try {
      const url = API + '?postId=' + post.id;
      const response = await fetch(url);
      const data = await response.json();
      setComments(data);
    } catch {
      setComments([]);
    }
  }


  // If the drawer is closed, draw nothing on the screen
  if (!open) {
    return null;
  }


  // Runs when the user submits the form (Enter key or send button)
  async function handleSend(e) {
    e.preventDefault();

    // 1. Get rid of extra spaces on the user's typed text
    const text = draft.trim();

    // 2. If they typed nothing, do nothing
    if (text === '') {
      return;
    }

    // 3. Build the comment we want to save
    const newComment = {
      postId: post.id,
      author: getAuthor(),
      text: text,
    };

    // 4. Send the comment to the backend.
    //    Wrap it in try/catch so we can show an error if the backend is off.
    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      // 5. If the backend said "something went wrong", stop and show an error
      if (response.ok === false) {
        setError('Could not save comment. Is the backend running on port 5000?');
        return;
      }

      // 6. Backend saved it — get the saved comment back (now with an _id)
      const savedComment = await response.json();

      // 7. Add it to the list, clear the input, clear any old error
      setComments([...comments, savedComment]);
      setDraft('');
      setError('');
    } catch {
      // Couldn't even reach the backend at all
      setError('Could not reach the backend. Is the server running on port 5000?');
    }
  }


  // ===== This is just the Icons and UI for comment drawer =====
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
          {error && <div className="comment-empty" style={{ color: '#ff9aa2' }}>{error}</div>}
          {!error && comments.length === 0 && (
            <div className="comment-empty">No comments yet — be the first.</div>
          )}

          {comments.map((c) => (
            <div key={c._id} className="comment-item">
              <div className="comment-avatar">{c.author?.[0]?.toUpperCase() || 'U'}</div>
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
            disabled={!draft.trim()}
            aria-label="Send comment"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>,
    document.body
  );
}