import { useEffect, useState } from "react";
import "../styles/Profile.css";
import { useParams } from "react-router-dom"; 

export default function Profile() {
const currentUser =
  JSON.parse(localStorage.getItem("user"));

const { id } = useParams();

const isOwnProfile =
  currentUser.id === id;

const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

const [hiddenSections, setHiddenSections] = useState([]);

const hideSection = (section) => {
  setHiddenSections((prev) => [...prev, section]);
};

const handleSave = () => {
  setEditMode(false);
};

const handleCancel = () => {
  setEditMode(false);
};

const [following, setFollowing] = useState(false);
const [followers, setFollowers] = useState(0);
const [followingCount, setFollowingCount] = useState(0);
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${id}`
      );

      const data = await res.json();

      setUser(data);

      setFollowers(data.followers.length);
      setFollowingCount(data.following.length);

    } catch (err) {
      console.error(err);
    }
  };

  fetchUser();
}, [id]);
const handleFollow = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/users/follow/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          currentUserId: currentUser.id,
        }),
      }
    );

    const data = await res.json();

    setFollowers(data.followers);

    setFollowing(!following);

  } catch (err) {
    console.error(err);
  }
};

const handleAvatarUpload = async (e) => {
  try {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("avatar", file);

    const res = await fetch(
      `http://localhost:5000/api/users/avatar/${currentUser.id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    const data = await res.json();

    setUser(data);

  } catch (err) {
    console.error(err);
  }
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
if (!user) return null;
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


      <div className="profile-card">
  <div className="profile-top">
    <img src={user.avatar} className="avatar" />

    {editMode ? (
      <div className="right-side edit-mode">
        <div className="name-row">
          <h2>{user.username}</h2>

          <label className="edit-icon">
           ✏️

        <input
         type="file"
         accept="image/*"
         style={{ display: "none" }}
          onChange={handleAvatarUpload}
          />
          </label> {/* change the avatar */}
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
            <strong>{followers}</strong>
            <p>followers</p>
          </div>

          <div>
            <strong>{followingCount}</strong>
            <p>following</p>
          </div>
        </div>
        

        <p className="bio">{user.bio}</p>

{isOwnProfile ? (
  <button
    className="edit-btn"
    onClick={() => setEditMode(true)}
  >
    Edit profile
  </button>
) : (
<button
  className="follow-btn"
  onClick={handleFollow}
>
  {following ? "Following" : "Follow"}
</button>
)}

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



{(editMode || !hiddenSections.includes("favSong")) && (
  <div className="section">
    <h3>Favourite Song</h3>

    {editMode && !hiddenSections.includes("favSong") && (
      <button
        className="close-btn"
        onClick={() => hideSection("favSong")}
      >
        ✕
      </button>
    )}

    {hiddenSections.includes("favSong") ? (
      <div className="hidden-box">
        <p>Favourite Song is hidden from feed</p>

        <button
          className="add-btn"
          onClick={() =>
            setHiddenSections((prev) =>
              prev.filter((s) => s !== "favSong")
            )
          }
        >
          Add to Feed
        </button>
      </div>
    ) : (
      <div className="music-card">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYGfgThjkF_7BReF5JcX3plPXTPUjYNhkpCw&s" />

        <div>
          <h4>Touch the Sky</h4>
          <p>Kanye West</p>
        </div>
      </div>
    )}
  </div>
)}


{(editMode || !hiddenSections.includes("favAlbum")) && (
  <div className="section">
    <h3>Favourite Album</h3>

    {editMode && !hiddenSections.includes("favAlbum") && (
      <button
        className="close-btn"
        onClick={() => hideSection("favAlbum")}
      >
        ✕
      </button>
    )}

    {hiddenSections.includes("favAlbum") ? (
      <div className="hidden-box">
        <p>Favourite Album is hidden from feed</p>

        <button
          className="add-btn"
          onClick={() =>
            setHiddenSections((prev) =>
              prev.filter((s) => s !== "favAlbum")
            )
          }
        >
          Add to Feed
        </button>
      </div>
    ) : (
      <div className="music-card">
        <img src="https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg" />

        <div>
          <h4>Graduation</h4>
          <p>Kanye West</p>
        </div>
      </div>
    )}
  </div>
)}

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