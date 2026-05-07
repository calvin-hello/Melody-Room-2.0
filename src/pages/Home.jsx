import React, { useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import PostCard from '../components/PostCard';

// Posts shown in the "Following" feed
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

// Posts shown in the "For You" feed
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

// Items for the "Following" grid view
const FOLLOWING_GRID = [
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
const FORYOU_GRID = [
  { id: 1, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', user: '@username123' },
  { id: 2, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80', user: '@username123' },
  { id: 3, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&q=80', user: '@username123' },
  { id: 4, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&q=80', user: '@username123' },
  { id: 5, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80', user: '@username123' },
  { id: 6, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&q=80', user: '@username123' },
  { id: 7, type: 'blog', user: '@username123', title: 'This is a blog post title', body: 'Blog posts only display text, no media. Text that overflows uses an ellipsis...' },
  { id: 8, type: 'blog', user: '@username123', title: 'Need some artist recommendations', body: 'Looking for new artists to follow! Drop your favorite underrated musicians below...' },
];


export default function Home({ activeTab }) {
  // false = feed view (full post cards)
  // true  = grid view (compact tiles)
  const [expanded, setExpanded] = useState(false);

  // Pick the data based on which tab is active
  let posts;
  let gridItems;
  if (activeTab === 'foryou') {
    posts = FORYOU_POSTS;
    gridItems = FORYOU_GRID;
  } else {
    posts = FOLLOWING_POSTS;
    gridItems = FOLLOWING_GRID;
  }

  // Build the toggle button classNames
  let collapseBtnClass = 'toggle-btn';
  if (!expanded) {
    collapseBtnClass = 'toggle-btn is-active';
  }

  let expandBtnClass = 'toggle-btn';
  if (expanded) {
    expandBtnClass = 'toggle-btn is-active';
  }

  return (
    <div style={{ position: 'relative', paddingBottom: 8 }}>
      {/* FEED VIEW */}
      {!expanded && (
        <div className="post-feed">
          {posts.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>
      )}

      {/* GRID VIEW */}
      {expanded && (
        <div className="post-grid">
          {gridItems.map((item) => {
            if (item.type === 'image') {
              return (
                <div key={item.id} className="grid-image-item">
                  <img src={item.imageUrl} alt="" />
                  <div className="grid-image-overlay">
                    <div className="grid-user-row">
                      <div className="grid-avatar">U</div>
                      <span className="grid-user-name">{item.user}</span>
                    </div>
                  </div>
                </div>
              );
            }
            // Blog tile
            return (
              <div key={item.id} className="grid-blog-item">
                <div className="grid-user-row">
                  <div className="grid-avatar">U</div>
                  <span className="grid-user-name">{item.user}</span>
                </div>
                <p className="grid-blog-title">{item.title}</p>
                <p className="grid-blog-body">{item.body}</p>
                <button className="grid-blog-more">more</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating view-toggle in the bottom-right */}
      <div className="view-toggle-wrapper">
        <div className="view-toggle">
          <button className={collapseBtnClass} onClick={() => setExpanded(false)}>
            <Minimize2 size={18} />
          </button>
          <button className={expandBtnClass} onClick={() => setExpanded(true)}>
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}