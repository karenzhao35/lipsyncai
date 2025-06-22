import { useState } from "react";
import Header from "./components/Header";
import Camera from "./components/Camera";
import Toast from "./components/Toast";

function App() {
  const [error, setError] = useState("");

  return (
    <>
      <Toast message={error} onClose={() => setError("")} />
      <div className="container">
        <Header />
        <Camera onError={setError} />
        <div id="status" className="status">
          Take a photo to begin rizzing 😎
        </div>
      </div>
    </>
  );
}

export default App;
