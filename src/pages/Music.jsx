import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "/src/styles/music.css";

export default function MusicPage() {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/music/');
        const data = await res.json();
        setSongs(data.songs || []);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="music-grid">
      {songs.map((song) => (
        <div
          key={song._id}
          className="music-card"
          onClick={() => navigate(`/listen/song/${song._id}`)}
        >
          <div
            className="music-cover"
            style={{
              backgroundImage: song.coverImage
                ? `url(${song.coverImage})`
                : 'none',
            }}
          />
          <div className="music-name">{song.title}</div>
        </div>
      ))}
    </div>
  )
}