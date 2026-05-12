import "/src/styles/Search.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSearchData();
    }, []);

    const fetchSearchData = async (query = "") => {
        try {
            setLoading(true);
            const url = query
                ? `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`
                : "http://localhost:5000/api/search";

            const response = await fetch(url);

            if (!response.ok) throw new Error("Error fetching search data");

            const data = await response.json();

            setArtists(data.artists || []);
            setAlbums(data.albums || []);
            setSongs(data.songs || []);
            setPosts(data.posts || []);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
            fetchSearchData(query);
        }, 300);
    };

    const formatDuration = (seconds) => {
        if (!seconds) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const hasContent = artists.length > 0 || albums.length > 0 || songs.length > 0 || posts.length > 0;

    return (
        <div className="search-page">
            <header className="search-nav">
                <div className="status-row">
                    <span>9:41</span>
                    <span>⌁ ◒ ▬</span>
                </div>
                <div className="search-header">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        <ArrowLeft strokeWidth={3} />
                    </button>
                    <input
                        type="search"
                        placeholder="Search"
                        className="search-bar"
                        value={searchQuery}
                        onChange={handleSearch}
                        autoFocus
                    />
                </div>
            </header>

            <main className="search-layout">
                {loading ? (
                    <div className="loading-message">Loading...</div>
                ) : !hasContent ? (
                    <div className="no-results">No results found</div>
                ) : (
                    <>
                        {/* ARTISTS SECTION */}
                        {artists.length > 0 && (
                            <section>
                                <div className="search-section-header">
                                    <h3>ARTISTS</h3>
                                    <button
                                        className="see-all-btn"
                                        onClick={() => navigate("/search/artists")}
                                    >
                                        See All
                                    </button>
                                </div>
                                <div className="search-list">
                                    {artists.map((artist) => (
                                        <div
                                            key={artist._id}
                                            className="search-item"
                                            onClick={() => navigate(`/artist/${artist._id}`)}
                                        >
                                            <div
                                                className="search-thumb artist-thumb"
                                                style={{
                                                    backgroundImage: artist.image
                                                        ? `url(${artist.image})`
                                                        : 'none',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    borderRadius: '50%'
                                                }}
                                            >
                                                {!artist.image && <span className="thumb-placeholder">🎤</span>}
                                            </div>
                                            <div>
                                                <div className="search-title filled">{artist.name}</div>
                                                <div className="search-subtitle filled">Artist</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ALBUMS SECTION */}
                        {albums.length > 0 && (
                            <section>
                                <div className="search-section-header">
                                    <h3>ALBUMS</h3>
                                    <button
                                        className="see-all-btn"
                                        onClick={() => navigate("/search/albums")}
                                    >
                                        See All
                                    </button>
                                </div>
                                <div className="search-list">
                                    {albums.map((album) => (
                                        <div
                                            key={album._id}
                                            className="search-item"
                                            onClick={() => navigate(`/album/${album._id}`)}
                                        >
                                            <div
                                                className="search-thumb"
                                                style={{
                                                    backgroundImage: album.coverImage
                                                        ? `url(${album.coverImage})`
                                                        : 'none',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                {!album.coverImage && <span className="thumb-placeholder">💿</span>}
                                            </div>
                                            <div>
                                                <div className="search-title filled">{album.title}</div>
                                                <div className="search-subtitle filled">
                                                    {album.artist?.name || 'Unknown Artist'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* SONGS SECTION */}
                        {songs.length > 0 && (
                            <section>
                                <div className="search-section-header">
                                    <h3>SONGS</h3>
                                    <button
                                        className="see-all-btn"
                                        onClick={() => navigate("/search/songs")}
                                    >
                                        See All
                                    </button>
                                </div>
                                <div className="search-list">
                                    {songs.map((song) => (
                                        <div
                                            key={song._id}
                                            className="search-item"
                                            onClick={() => navigate(`/song/${song._id}`)}
                                        >
                                            <div
                                                className="search-thumb"
                                                style={{
                                                    backgroundImage: song.coverImage
                                                        ? `url(${song.coverImage})`
                                                        : 'none',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                {!song.coverImage && <span className="thumb-placeholder">🎵</span>}
                                            </div>
                                            <div>
                                                <div className="search-title filled">{song.title}</div>
                                                <div className="search-subtitle filled">
                                                    {song.artist?.name || 'Unknown Artist'} • {formatDuration(song.duration)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* POSTS SECTION */}
                        {posts.length > 0 && (
                            <section>
                                <div className="search-section-header">
                                    <h3>POSTS</h3>
                                    <button
                                        className="see-all-btn"
                                        onClick={() => navigate("/search/posts")}
                                    >
                                        See All
                                    </button>
                                </div>
                                <div className="posts-grid">
                                    {posts.map((post) => (
                                        <div
                                            key={post._id}
                                            className="post-card"
                                            style={{
                                                backgroundImage: post.image
                                                    ? `url(${post.image})`
                                                    : 'none',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                            onClick={() => navigate(`/post/${post._id}`)}
                                        >
                                            {!post.image && (
                                                <div className="post-placeholder">
                                                    <span>📝</span>
                                                    <p>{post.authorType || 'User'}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}