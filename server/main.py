from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # The origin of your React app
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/upload")
async def upload_photo(photo: UploadFile = File(...)):
    with open(f"uploads/{photo.filename}", "wb") as buffer:
        buffer.write(await photo.read())
    return {"filename": photo.filename, "status": "ok"}