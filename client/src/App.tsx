

function App() {

  return (
    <>
      <div className="container">
        <div className="header">
          <h1 className="title">RIZZ CAM</h1>
          <p className="subtitle">Gen Alpha Edition 🔥</p>
        </div>

        <div className="camera-container">
          <video id="video" autoPlay playsInline></video>
          <canvas id="canvas" className="hidden"></canvas>
          <div id="photo-container" className="photo-container">
            <canvas id="photo-canvas"></canvas>
            <div id="laser-left" className="laser-eye"></div>
            <div id="laser-right" className="laser-eye"></div>
            <div id="mouth-overlay" className="mouth-overlay"></div>
          </div>
        </div>

        <div className="controls">
          <button id="capture-btn" className="btn btn-primary">
            📸 Capture Your Rizz
          </button>
          <button id="listen-btn" className="btn btn-secondary hidden">
            🎤 Activate Rizz Mode
          </button>
          <button id="retake-btn" className="btn btn-secondary hidden">
            🔄 Retake Photo
          </button>
        </div>

        <div id="status" className="status">
          Say "Hi" or "Hello" to activate the rizz! 😎
        </div>
      </div>
    </>
  );
}

export default App;
