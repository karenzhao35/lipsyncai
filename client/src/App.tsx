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
      </div>
    </>
  );
}

export default App;
