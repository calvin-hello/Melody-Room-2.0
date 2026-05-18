import { useEffect, useState } from "react";
import "../styles/Profile.css";
import { useParams } from "react-router-dom";
import { SquarePen } from "lucide-react";

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
const [weeklyTracks, setWeeklyTracks] = useState([]);
const [favSong, setFavSong] = useState(null);
const [favAlbum, setFavAlbum] = useState(null);
useEffect(() => {
  const fetchMusic = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/deezer/profile-music"
      );
      const data = await res.json();
      setWeeklyTracks(data.weeklyTracks);
      setFavSong(data.favSong);
      setFavAlbum(data.favAlbum);
    } catch (err) {
      console.error(err);
    }
  };

  fetchMusic();
}, []);

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
      title: "This is a blog post title",
      body: "Blog post displayed in a profile. Profile picture and username is not displayed. Instead, only the title and blog content.",
    },
    {
      img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
      title: "Just found my new summer anthem!",
    },
    {
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      title: "Anyone else excited for this to release?",
    },
    {
      img: "",
      title: "This is a blog post title",
      body: "Blog post displayed in a profile. Profile picture and username is not displayed. Instead, only the title and blog content.",
    },
    {
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500",
      title: "Finally got to go to this concert!",
    },
  ];
if (!user) return null;
  return (
    
    <div className="profile-page">

      {/* HEADER — "My Profile" + @handle now lives in the TopNav.
          Only the music tag stays here. */}
      <div className="profile-header">
        <div className="music-tag">
          🎧 STRONGER | Kanye West
        </div>
      </div>


      <div className="profile-card">
  <div className="profile-top">
    {/* Avatar wrapper — when in edit mode, shows a small purple edit
        icon overlaid on the bottom-right corner that opens the file picker. */}
    <div className="avatar-wrap">
      <img src={user.avatar} className="avatar" />

      {editMode && (
        <label className="avatar-edit-btn" aria-label="Change avatar">
          <SquarePen size={16} />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarUpload}
          />
        </label>
      )}
    </div>

    {editMode ? (
      <div className="right-side edit-mode">
        <div className="name-row">
          <h2>{user.username}</h2>
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
        <div className="name-row">
          <h2>{user.username}</h2>
        </div>

        <p className="handle">@{user.username}</p>

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
             {weeklyTracks.map((song) => (
                <div className="track" key={song.id}>
                  <img src={song.coverImage} alt={song.title} />
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
          {favSong && (
    <>
      <img src={favSong.coverImage} />

      <div>
        <h4>{favSong.title}</h4>
        <p>{favSong.artist}</p>
      </div>
    </>
  )}
       

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
         {favAlbum && (
              <>

          <img src={favAlbum.coverImage} />
          <div>
            <h4>{favAlbum.title}</h4>
            <p>{favAlbum.artist}</p>
          </div>
              </>
        )}

      </div>
    )}
  </div>
)}

      {/* Posts grid — sits directly on the page background, no surrounding box.
          Adds an `is-edit-mode` class when the user is editing so the cards
          switch from rounded to square (and blog cards show the body). */}
      <div className="posts-section">
        <h3 className="posts-title">POSTS</h3>

        <div className={`posts-grid ${editMode ? "is-edit-mode" : ""}`}>
          {posts.map((post, i) => (
            <div className="post-card" key={i}>
              {post.img ? (
                <>
                  {/* Image post: title overlay sits on TOP of the image */}
                  <div className="post-overlay-top">{post.title}</div>
                  <img src={post.img} />
                </>
              ) : (
                <>
                  {/* Blog post: title on top, body underneath (body is hidden
                      via CSS when not in edit mode). */}
                  <h4 className="post-blog-title">{post.title}</h4>
                  <p className="post-blog-body">{post.body}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}