import { useState, useRef, useEffect } from "react";

interface CameraProps {
  onError: (message: string) => void;
}

const Camera = ({ onError }: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [view, setView] = useState<"stream" | "photo">("stream");

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

  const capturePhoto = async () => {
    if (videoRef.current && photoRef.current) {
      const video = videoRef.current;
      const photo = photoRef.current;
      const context = photo.getContext("2d");

      if (context) {
        photo.width = video.videoWidth;
        photo.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        setView("photo");
        stopStream();

        photo.toBlob(async (blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append("photo", blob, "face.png");

            try {
              const response = await fetch("http://127.0.0.1:8000/api/upload", {
                method: "POST",
                body: formData,
              });

              if (!response.ok) {
                onError("Failed to upload photo.");
              } else {
                const result = await response.json();
                console.log("Upload successful:", result);
              }
            } catch (err) {
              console.error("Error uploading photo:", err);
              onError("Error uploading photo.");
            }
          }
        }, "image/png");
      }
    }
  };

  const retakePhoto = () => {
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
          style={{ display: view === "photo" ? "block" : "none" }}
        ></canvas>
      </div>

      <div className="controls">
        {view === "stream" && (
          <button onClick={capturePhoto} className="btn btn-primary">
            📸 Capture Your Rizz
          </button>
        )}

        {view === "photo" && (
          <button onClick={retakePhoto} className="btn btn-secondary">
            🔄 Retake Photo
          </button>
        )}
      </div>
    </>
  );
};

export default Camera; 