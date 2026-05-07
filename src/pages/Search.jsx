import "/src/styles/Search.css";

export default function Search() {

    return (
        <div className="search-page">
            <header className="search-nav">
                <div className="status-row">
                    <span>9:41</span>
                    <span>⌁ ◒ ▬</span>
                </div>
                <div className="search-header">
                    <button className="back-button"><img src="./src/assets/arrow.png" alt="arrow" /></button>
                    <input
                        type="search"
                        placeholder="Search"
                        className="search-bar"
                    />
                </div>
            </header>
            <main className="search-layout">
                <section>
                    <div className="search-section-header">
                        <h3>ARTISTS</h3>
                        <p>See All</p>
                    </div>
                    <div className="search-list">
                        <div className="search-item">
                            <div className="search-thumb"></div>
                            <div>
                                <div className="search-title"></div>
                                <div className="search-subtitle"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="search-section-header">
                        <h3>ALBUMS</h3>
                        <p>See All</p>
                    </div>
                    <div className="search-list">
                        <div className="search-item">
                            <div className="search-thumb"></div>
                            <div>
                                <div className="search-title"></div>
                                <div className="search-subtitle"></div>
                            </div>
                        </div>
                        <div className="search-item">
                            <div className="search-thumb"></div>
                                <div>
                                    <div className="search-title"></div>
                                    <div className="search-subtitle"></div>
                                </div>
                            </div>
                    </div>
                </section>

                <section>
                    <div className="search-section-header">
                        <h3>SONGS</h3>
                        <p>See All</p>
                    </div>
                    <div className="search-list">
                        <div className="search-item">
                            <div className="search-thumb"></div>
                            <div>
                                <div className="search-title"></div>
                                <div className="search-subtitle"></div>
                            </div>
                        </div>
                        <div className="search-item">
                            <div className="search-thumb"></div>
                            <div>
                                <div className="search-title"></div>
                                <div className="search-subtitle"></div>
                            </div>
                        </div>
                        <div className="search-item">
                            <div className="search-thumb"></div>
                            <div>
                                <div className="search-title"></div>
                                <div className="search-subtitle"></div>
                            </div>
                        </div>
                    </div>
                </section>
        
                <section>
                    <div className="search-section-header">
                        <h3>POSTS</h3>
                        <p>See All</p>
                    </div>
                    <div className="posts-grid">
                        <div className="post-card"></div>
                        <div className="post-card"></div>
                        <div className="post-card"></div>
                        <div className="post-card"></div>
                    </div>
                </section>
            </main>
        </div>
    )
}