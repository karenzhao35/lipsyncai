from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from generate_rizz import generate_phrases

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
async def root():
    return {"message": "Hello World"}

@app.post("/api/process")
async def process_photo(photo: UploadFile = File(...), prompt: str = Form(...)):
    with open(f"uploads/{photo.filename}", "wb") as buffer:
        buffer.write(await photo.read())
    phrases = generate_phrases(prompt)
    print(phrases)
    return {
        "filename": photo.filename,
        "prompt": prompt,
        "status": "processing_complete"
    }