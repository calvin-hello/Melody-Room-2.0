import "./BarLoader.css";

export default function BarLoader() {
  return (
    <div className="loader-wrap">
      <h1>Melody Room</h1>
      <div className="logo-circle">🎶</div>
      <p>Loading...</p>

      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      <span>75%</span>
    </div>
  );
}