import React, { useState } from 'react';
import PostCard from '../components/PostCard';

// =====================================================================
// Mock data — in a real app, these would be fetched from the backend
// (api.js → GET /api/posts). For now we just hard-code arrays of posts.
// =====================================================================

// Posts shown in the FEED VIEW for the "Following" tab
const FOLLOWING_POSTS = [
  {
    id: 1, type: 'image',
    title: 'Still my favourite album of all time',
    author: 'user.name123',
    caption: 'This is a post caption...',
    imageUrl: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80',
  },
  {
    id: 2, type: 'blog',
    title: 'Need some new music, share some of your favourites!',
    author: 'user.name123',
    caption: 'This is a post caption for blog posts...\n\nThere are no pictures, no videos, no songs.\n\nJust simply plain text.\n\nThey essentially behave the same as other posts.',
  },
  {
    id: 3, type: 'image',
    title: 'An honest headphone review',
    author: 'user.name123',
    caption: 'This is a longer caption to show how longer captions fill out the space in the captions area of posts...',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  },
];

// Posts for the "For You" tab feed
const FORYOU_POSTS = [
  {
    id: 1, type: 'image',
    title: "Best concert I've been to so far!",
    author: 'user.name123',
    caption: 'This is a longer caption to show how longer captions fill out the space in the captions area of posts...',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
  },
  {
    id: 2, type: 'image',
    title: 'An honest headphone review',
    author: 'user.name123',
    caption: 'This is a shorter post caption...',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  },
  {
    id: 3, type: 'blog',
    title: 'Looking for budget speakers!',
    author: 'user.name123',
    caption: 'This is a post caption for blog posts...\n\nThere are no pictures, no videos, no songs. Just simply plain text.\n\nThey essentially behave the same as other posts.',
  },
];

// Items shown in the GRID VIEW for "Following" — mix of images and blog cards
const FOLLOWING_GRID_ITEMS = [
  { id: 1, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&q=80', user: '@username123' },
  { id: 2, type: 'blog', user: '@username123', title: 'This is a blog post title', body: 'Blog posts only display text, no media. Text that overflows uses an ellipsis...' },
  { id: 3, type: 'blog', user: '@username123', title: 'This is a blog post title', body: 'Blog posts only display text, no media. Text that overflows uses an ellipsis...' },
  { id: 4, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', user: '@username123' },
  { id: 5, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80', user: '@username123' },
  { id: 6, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1459233313842-cd392ee2c388?w=400&q=80', user: '@username123' },
  { id: 7, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=80', user: '@username123' },
  { id: 8, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80', user: '@username123' },
];

// Items for the "For You" grid view
const FORYOU_GRID_ITEMS = [
  { id: 1, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', user: '@username123' },
  { id: 2, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80', user: '@username123' },
  { id: 3, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&q=80', user: '@username123' },
  { id: 4, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&q=80', user: '@username123' },
  { id: 5, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80', user: '@username123' },
  { id: 6, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&q=80', user: '@username123' },
  { id: 7, type: 'blog', user: '@username123', title: 'This is a blog post title', body: 'Blog posts only display text, no media. Text that overflows uses an ellipsis...' },
  { id: 8, type: 'blog', user: '@username123', title: 'Need some artist recommendations', body: 'Looking for new artists to follow! Drop your favorite underrated musicians below...' },
];

// =====================================================================
// Icon components for the view-toggle (bracket-style "expand" / "collapse")
// =====================================================================
const ExpandIcon = () => (
  <svg className="toggle-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 9 4 4 9 4" />
    <polyline points="20 9 20 4 15 4" />
    <polyline points="4 15 4 20 9 20" />
    <polyline points="20 15 20 20 15 20" />
  </svg>
);

const CollapseIcon = () => (
  <svg className="toggle-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 4 4 4 4 9" />
    <polyline points="15 4 20 4 20 9" />
    <polyline points="9 20 4 20 4 15" />
    <polyline points="15 20 20 20 20 15" />
  </svg>
);

// =====================================================================
// Sub-components for grid items.
// Defined OUTSIDE the main Home component so they don't get re-created on every render.
// =====================================================================

// One image tile in the grid
function ImageGridItem({ item }) {
  return (
    <div className="grid-image-item">
      <img src={item.imageUrl} alt="" loading="lazy" />
      {/* The username overlay appears on hover (CSS handles the fade) */}
      <div className="grid-image-overlay">
        <div className="grid-user-row">
          <div className="grid-avatar">U</div>
          <span className="grid-user-name">{item.user}</span>
        </div>
      </div>
    </div>
  );
}

// One blog tile in the grid (no image, just text)
function BlogGridItem({ item }) {
  return (
    <div className="grid-blog-item">
      <div className="grid-user-row">
        <div className="grid-avatar">U</div>
        <span className="grid-user-name">{item.user}</span>
      </div>
      <p className="grid-blog-title">{item.title}</p>
      <p className="grid-blog-body">{item.body}</p>
      <button className="grid-blog-more">more</button>
    </div>
  );
}

// =====================================================================
// MAIN COMPONENT — Home page
// Receives `activeTab` from App.jsx so it knows whether to show "Following" or "For You" data.
// =====================================================================
export default function Home({ activeTab }) {
  // expanded = false → feed view (full PostCards)
  // expanded = true  → grid view (compact 2-col tiles)
  const [expanded, setExpanded] = useState(false);

  // Helper function decides what to render based on tab and view mode
  const renderContent = () => {
    if (!expanded) {
      // FEED VIEW: pick the right post array based on which tab is active
      const posts = activeTab === 'foryou' ? FORYOU_POSTS : FOLLOWING_POSTS;
      return (
        <div className="post-feed">
          {/* Loop over posts and render one PostCard per item.
              The `style` prop staggers the fade-in animation by 80ms per card. */}
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} style={{ animationDelay: `${i * 0.08}s` }} />
          ))}
        </div>
      );
    }

    // GRID VIEW: pick the right grid items array
    const items = activeTab === 'foryou' ? FORYOU_GRID_ITEMS : FOLLOWING_GRID_ITEMS;
    return (
      <div className="post-grid">
        {/* Render either an image tile or a blog tile depending on item.type */}
        {items.map(item => (
          item.type === 'image'
            ? <ImageGridItem key={item.id} item={item} />
            : <BlogGridItem key={item.id} item={item} />
        ))}
      </div>
    );
  };

  return (
    <div style={{ position: 'relative', paddingBottom: 8 }}>
      {/* Either the feed or the grid renders here */}
      {renderContent()}

      {/* Floating view-toggle pinned to the bottom-right of the centered phone container */}
      <div className="view-toggle-wrapper">
        <div className="view-toggle">
          {/* Collapse icon (left) — switches to feed view */}
          <button
            onClick={() => setExpanded(false)}
            aria-label="Simple grid view"
            aria-pressed={!expanded}
            className={`toggle-btn${!expanded ? ' is-active' : ''}`}
          >
            <CollapseIcon />
          </button>
          {/* Expand icon (right) — switches to grid view */}
          <button
            onClick={() => setExpanded(true)}
            aria-label="Expanded view"
            aria-pressed={expanded}
            className={`toggle-btn${expanded ? ' is-active' : ''}`}
          >
            <ExpandIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
