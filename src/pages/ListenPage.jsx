import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../styles/ListenPage.css";

import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Bookmark,
} from "lucide-react";

export default function ListenPage() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    async function fetchTrack() {
      const res = await fetch(`http://localhost:5000/api/deezer/${type}/${id}`);
      const data = await res.json();
      setTrack(data);
    }

    fetchTrack();
  }, [type, id]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  if (!track) {
    return (
      <div className="app-shell listen-page">
        <p className="listen-loading">Loading...</p>
      </div>
    );
  }

  return (
    <div className="app-shell listen-page">
      <main className="listen-content">
        <header className="listen-header">
          <button className="listen-icon-btn" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
          <h2>Listen</h2>
          <button className="listen-icon-btn">
            <Bookmark />
          </button>
        </header>

        <img className="listen-cover" src={track.coverImage} alt={track.title} />

        <section className="listen-info">
          <h1>{track.title}</h1>
          <p>{track.artist}</p>
        </section>

        <div className="fake-progress">
          <span>0:00</span>
          <div className="progress-line">
            <div className="progress-dot" />
          </div>
          <span>0:30</span>
        </div>

        <div className="player-controls">
          <Shuffle />
          <SkipBack />
          <button className="play-btn" onClick={togglePlay}>
            {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
          </button>
          <SkipForward />
          <Repeat />
        </div>

        {track.preview && (
          <audio
            ref={audioRef}
            src={track.preview}
            onEnded={() => setPlaying(false)}
          />
        )}
      </main>
    </div>
  );
}