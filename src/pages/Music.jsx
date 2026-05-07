import React from 'react';

const tracks = [
  { title: 'Midnight Bloom', artist: 'Cosmo Sheldrake', plays: '12.4K', emoji: '🎵' },
  { title: 'Electric Soul',  artist: 'Jon Bellion',     plays: '9.8K',  emoji: '⚡' },
  { title: 'Forest Echoes',  artist: 'Mother Mother',   plays: '8.7K',  emoji: '🌿' },
];

export default function MusicPage() {
  return (
    <div className="page-section">
      <h2 className="section-title">Trending Music</h2>

      <div className="track-list">
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