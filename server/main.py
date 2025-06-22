from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from generate_rizz import generate_phrases
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/upload")
async def upload_photo(photo: UploadFile = File(...)):
    with open(f"uploads/{photo.filename}", "wb") as buffer:
        buffer.write(await photo.read())
    return {"filename": photo.filename, "status": "ok"}

@app.post("/api/process")
async def process_photo(photo: UploadFile = File(...), prompt: str = Form(...)):
    with open(f"uploads/{photo.filename}", "wb") as buffer:
        buffer.write(await photo.read())
    phrases = generate_phrases(prompt)
    print(phrases)
    
    # For now, return a dummy video file
    # In the future, this will be the actual generated video
    dummy_video_path = "uploads/result_voice.mp4"
    
    # Create a dummy video file if it doesn't exist
    if not os.path.exists(dummy_video_path):
        # Create an empty file for now
        with open(dummy_video_path, "wb") as f:
            f.write(b"dummy video content")
    
    return FileResponse(
        path=dummy_video_path,
        media_type="video/mp4",
        filename="rizz_video.mp4"
    )