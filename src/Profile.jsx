import { useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { Home, Music, Bookmark } from "lucide-react";


export default function Profile() {
  const savedUser = JSON.parse(localStorage.getItem("user")) || {
    username: "goat.yeee",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg/250px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg",
    followers: "77.1M",
    following: 1,
    bio: "Always looking for new music!",
  };

  const [user, setUser] = useState(savedUser);
  const [editMode, setEditMode] = useState(false);

  const [hiddenSections, setHiddenSections] = useState([]);
  const [savedHiddenSections, setSavedHiddenSections] = useState([]);
const hideSection = (section) => {
  setHiddenSections((prev) => [...prev, section]);
};
const handleSave = () => {
  setSavedHiddenSections(hiddenSections); 
  setEditMode(false);
};

const handleCancel = () => {
  setUser(savedUser); 
  setEditMode(false);
};

  const posts = [
    {
      img: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=500",
      title: "Still one of my favourites of all time",
    },
    {
      img: "",
      title: "Need some new music, share some of your favourites!",
    },
    {
      img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
      title: "Just found my new summer anthem!",
    },
    {
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      title: "Anyone else excited for this album release?",
    },
    {
      img: "",
      title: "Best music festivals in BC?",
    },
    {
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500",
      title: "Finally got to go to this concert!",
    },
  ];

  return (
    
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        <h2>My Profile</h2>
        <p>@{user.username}</p>

        <div className="music-tag">
          🎧 STRONGER | Kanye West
        </div>

      </div>

<div className="bottom-nav">
  <Link to="/dashboard" className="nav-item">
    <Home size={26} strokeWidth={2} />
  </Link>

  <div className="nav-item">
    <Music size={26} strokeWidth={2} />
  </div>

  <div className="nav-item">
    <Bookmark size={26} strokeWidth={2} />
  </div>
  <div className="nav-item profile-icon">
    <img src={user.avatar} alt="pfp" />
  </div>
</div>

      <div className="profile-card">
  <div className="profile-top">
    <img src={user.avatar} className="avatar" />

    {editMode ? (
      <div className="right-side edit-mode">
        <div className="name-row">
          <h2>{user.username}</h2>

          <div className="edit-icon">✏️</div>
        </div>

        <p className="handle">@{user.username}</p>

        <p className="bio">{user.bio}</p>

        <div className="edit-actions">
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>

          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <div className="right-side">
        <div className="stats">
          <div>
            <strong>{user.followers}</strong>
            <p>followers</p>
          </div>

          <div>
            <strong>{user.following}</strong>
            <p>following</p>
          </div>
        </div>

        <p className="bio">{user.bio}</p>

        <button
          className="edit-btn"
          onClick={() => setEditMode(true)}
        >
          Edit profile
        </button>
      </div>
    )}
  </div>
</div>
{(editMode || !hiddenSections.includes("tracks")) && (
    <div className="section">
  <h3>Tracks of the Week</h3>

  {editMode && !hiddenSections.includes("tracks") && (
    <button
      className="close-btn"
      onClick={() => hideSection("tracks")}
    >
      ✕
    </button>
  )}

  {hiddenSections.includes("tracks") ? (
  <div className="hidden-box">
    <p>Tracks of the Week is hidden from feed</p>

    {editMode && (
      <button
        className="add-btn"
        onClick={() =>
          setHiddenSections((prev) =>
            prev.filter((s) => s !== "tracks")
          )
        }
      >
        Add to Feed
      </button>
    )}
  </div>
) : (
            <div className="track-row">
              {[
                {
                  title: "Stronger",
                  img: "https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg",
                },
                {
                  title: "Heartless",
                  img: "https://i1.sndcdn.com/artworks-vHzO7U4wUvlZ-0-t500x500.jpg",
                },
                {
                  title: "POWER",
                  img: "https://upload.wikimedia.org/wikipedia/en/f/f0/My_Beautiful_Dark_Twisted_Fantasy.jpg",
                },
                {
                  title: "Gold Digger",
                  img: "https://corp-assets-prod.skiomusic.com/assets/wishlist/kanye-west-gold-digger-remix-stem-pack.jpg",
                },
              ].map((song, i) => (
                <div className="track" key={i}>
                  <img src={song.img} alt={song.title} />
                  <p>{song.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="section">
  <h3>Favourite Song</h3>

  <div className="music-card">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYGfgThjkF_7BReF5JcX3plPXTPUjYNhkpCw&s" />
    <div>
      <h4>Touch the Sky</h4>
      <p>Kanye West</p>
    </div>
  </div>
</div>

{/* FAV ALBUM */}
<div className="section">
  <h3>Favourite Album</h3>

  <div className="music-card">
    <img src="https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg" />
    <div>
      <h4>Graduation</h4>
      <p>Kanye West</p>
    </div>
  </div>
</div>

      {/* POSTS */}
      <div className="section">
        <h3>Posts</h3>

        <div className="posts-grid">
          {posts.map((post, i) => (
            <div className="post-card" key={i}>
              {post.img ? (
                <img src={post.img} />
              ) : (
                <div className="post-text">{post.title}</div>
              )}

              {post.img && (
                <div className="post-overlay">
                  {post.title}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}