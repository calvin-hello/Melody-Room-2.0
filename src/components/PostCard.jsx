import React, { useState } from 'react';
import { Heart, MessageCircle, Send, User } from 'lucide-react';
import CommentDrawer from './CommentDrawer.jsx';

export default function PostCard({ post, style }) {
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const isBlog = post.type === 'blog';

  let username = 'user.name123';
  if (post.author) {
    username = post.author;
  }

  let heartClass = 'post-action-btn';
  if (liked) {
    heartClass = 'post-action-btn is-liked';
  }

  let heartFill = 'none';
  if (liked) {
    heartFill = 'currentColor';
  }

  const actions = (
    <div className="post-actions">
      <button className={heartClass} onClick={() => setLiked(!liked)} aria-label="Like">
        <Heart size={18} fill={heartFill} />
      </button>
      <button className="post-action-btn" onClick={() => setShowComments(true)} aria-label="Comment">
        <MessageCircle size={18} />
      </button>
      <button className="post-action-btn" aria-label="Share">
        <Send size={18} />
      </button>
    </div>
  );

  let header;
  if (isBlog) {
    header = (
      <div className="post-header">
        <div className="post-avatar"><User size={18} /></div>
        <p className="post-title">{post.title}</p>
      </div>
    );
  } else {
    header = (
      <div className="post-image-wrap">
        <img className="post-image" src={post.imageUrl} alt={post.title} />
        <div className="post-image-overlay">
          <div className="post-avatar"><User size={18} /></div>
          <p className="post-image-title">{post.title}</p>
        </div>
      </div>
    );
  }

  let body;
  if (isBlog) {
    const lines = post.caption.split('\n').filter((line) => line.length > 0);

    body = (
      <>
        <p className="post-username">{username}</p>
        <div className="post-blog-body">
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <div className="post-blog-actions">{actions}</div>
      </>
    );
  } else {
    const caption = post.caption || '';
    const isLong = caption.length > 100;

    let captionText = caption;
    if (isLong && !expanded) {
      captionText = caption.slice(0, 100) + '...';
    }

    body = (
      <>
        <div className="post-meta-row">
          <p className="post-username">{username}</p>
          {actions}
        </div>
        <p className="post-caption">
          {captionText}
          {isLong && (
            <button className="post-caption-toggle" onClick={() => setExpanded(!expanded)}>
              {expanded ? 'less' : 'more'}
            </button>
          )}
        </p>
      </>
    );
  }

  // From CommentDrawer.jsx
  return (
    <div className="post-card" style={style}>
      {header}
      <div className="post-footer">{body}</div>

      <CommentDrawer
        open={showComments}
        onClose={() => setShowComments(false)}
        post={post}
      />
    </div>
  );
}