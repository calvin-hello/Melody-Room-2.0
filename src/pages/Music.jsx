import React from 'react';

// Hardcoded list of trending tracks (in a real app this would come from the backend via api.js)
const tracks = [
  { title: 'Midnight Bloom', artist: 'Cosmo Sheldrake', plays: '12.4K', emoji: '🎵' },
  { title: 'Electric Soul',  artist: 'Jon Bellion',     plays: '9.8K',  emoji: '⚡' },
  { title: 'Forest Echoes',  artist: 'Mother Mother',   plays: '8.7K',  emoji: '🌿' },
];

// Page component shown when URL is /music
export default function MusicPage() {
  return (
    <div className="page-section">
      <h2 className="section-title">Trending Music</h2>

      {/* The list of track cards */}
      <div className="track-list">
        {/*
          .map() loops over the tracks array and returns one <div> per track.
          React needs a unique `key` for each item to track them efficiently —
          here we use the array index `i`.
        */}
        {tracks.map((track, i) => (
          <div key={i} className="track-item">
            <div className="track-emoji">{track.emoji}</div>
            <div>
              <p className="track-title">{track.title}</p>
              <p className="track-meta">{track.artist} · {track.plays} plays</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
