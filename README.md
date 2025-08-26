# Lip sync AI 🔥

<img width="1128" alt="Screenshot 2025-06-25 at 10 22 14 PM" src="https://github.com/user-attachments/assets/6c1892ea-e1b9-4c4c-89da-261cf1e6384f" />

> *The AI wingman you never asked for, but always deserved.*

**RizzAssist** is a deeply unserious project built for the Stupid Ideas Hackathon — and we actually won. It uses face detection, deepfakes, and AI-generated pickup lines to give you the ultimate automated flirting assistant. Take a selfie, let RizzAssist generate a killer pickup line with Cohere, synthesize a voice with TTS, and then lip-sync it onto your face with Wave2Lip.

It's stupid. It's cursed. It's technically very real.

---

## 🧠 Tech Stack

- **Frontend**: React + Vite + Webcam capture
- **Backend**: FastAPI (Python)
- **AI + Media**:
  - [Wave2Lip](https://github.com/Rudrabha/Wav2Lip): Deepfake your lips to say the pickup line
  - [Cohere API](https://cohere.com/): Generate real-time pickup lines
  - Text-to-Speech (TTS): Convert text to audio
- **Deployment**: Local server (due to GPU requirements for Wave2Lip)

---

## 🕵️‍♀️ How It Works

1. **Smile for the camera**  
   You take a selfie using your webcam from the frontend.

2. **Cohere gets charming**  
   The backend uses the Cohere API to generate a cheesy pickup line based on some traits you provide.

3. **Voice it up**  
   The line is passed into a TTS engine to generate speech audio.

4. **Lipsync magic**  
   Wave2Lip syncs the audio with your selfie, deepfaking your lips to say the line.

5. **Profit (or rejection)**  
   The final result: a video of you (sort of) saying something flirty.
