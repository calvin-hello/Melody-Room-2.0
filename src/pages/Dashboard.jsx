import "../styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "user.name123";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="home-page">
      <header className="top-nav">
        <h1>Melody Room</h1>

        <nav>
          <Link className="active" to="/dashboard">
            For You
          </Link>
          {/* <Link>Following</Link> */}
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main className="home-layout">
        <section className="feed-section">
          <input type="search" placeholder="Search posts..." className="search-bar" />

          <article className="post-card">
            <h3>◎ Best concert I’ve been to so far!</h3>
            <img src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900" />
            <div className="post-meta">
              <strong>{username}</strong>
              <span>♡ 💬 ➤</span>
            </div>
            <p>This is a longer caption to show how posts appear in the feed.</p>
          </article>

          <article className="post-card">
            <h3>◎ An honest headphone review</h3>
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900" />
            <div className="post-meta">
              <strong>{username}</strong>
              <span>♡ 💬 ➤</span>
            </div>
            <p>This is a shorter post caption...</p>
          </article>
        </section>

        {/* <aside className="side-panel">
          <h2>Comments</h2>
          <p><strong>{username}</strong> This is a comment...</p>
          <p><strong>musicfan42</strong> Love this post.</p>
          <p><strong>beatmaker</strong> Great recommendation.</p>
        </aside> */}
      </main>
    </div>
  );
}