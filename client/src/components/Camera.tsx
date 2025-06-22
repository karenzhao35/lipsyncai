import { useState, useRef, useEffect } from "react";
import RizzInput from "./RizzInput";

interface CameraProps {
  onError: (message: string) => void;
}

const Camera = ({ onError }: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [view, setView] = useState<"stream" | "form" | "loading" | "results">("stream");
  const [prompt, setPrompt] = useState("");
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [resultVideoUrl, setResultVideoUrl] = useState<string | null>(null);

  const enableStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setView("stream");
      onError(""); // Clear previous errors
    } catch (err) {
      if (err instanceof Error) {
        onError(`Error accessing webcam: ${err.message}`);
      } else {
        onError("An unknown error occurred while accessing the webcam.");
      }
    }
  };

  useEffect(() => {
    enableStream();
  }, []);

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && photoRef.current) {
      const video = videoRef.current;
      const photo = photoRef.current;
      const context = photo.getContext("2d");

      if (context) {
        photo.width = video.videoWidth;
        photo.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        stopStream();

        photo.toBlob((blob) => {
          if (blob) {
            setPhotoBlob(blob);
          }
        }, "image/png");

        setView("form");
      }
    }
  };
  
  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoBlob) {
      onError("No photo has been captured.");
      return;
    }

    setView("loading");

    const formData = new FormData();
    formData.append("photo", photoBlob, "face.png");
    formData.append("prompt", prompt);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/process", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        onError("Failed to process photo.");
        setView("form");
      } else {
        // Handle video response
        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        setResultVideoUrl(videoUrl);
        setView("results");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      onError("Error submitting form.");
      setView("form");
    }
  };

  const retakePhoto = () => {
    setPrompt("");
    setPhotoBlob(null);
    if (resultVideoUrl) {
      URL.revokeObjectURL(resultVideoUrl);
      setResultVideoUrl(null);
    }
    enableStream();
  };

  return (
    <>
      <div className="camera-container">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ display: view === "stream" ? "block" : "none" }}
        ></video>
        <canvas
          ref={photoRef}
          style={{
            display: view === "form" ? "block" : "none",
          }}
        ></canvas>
        {view === "results" && resultVideoUrl && (
          <video
            className="results-video"
            controls
            id="myVideo"
          >
            <source src={resultVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {view === "stream" && (
        <div className="controls">
          <button onClick={capturePhoto} className="btn btn-primary">
            📸 Capture Your Rizz
          </button>
        </div>
      )}

      {view === "form" && (
        <RizzInput
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={handleStart}
          onRetake={retakePhoto}
        />
      )}

      {view === "loading" && (
        <div className="loading-view">
          <div className="loader"></div>
          <p className="loading-text">preparing the rizz...</p>
        </div>
      )}

      {view === "results" && (
        <div className="controls">
          <button onClick={retakePhoto} className="btn btn-secondary">
            🔄 Create New Rizz
          </button>
        </div>
      )}
    </>
  );
};

export default Camera; 