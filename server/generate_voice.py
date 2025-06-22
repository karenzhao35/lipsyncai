from TTS.api import TTS
from pydub import AudioSegment
from pydub.playback import play

# Initialize Coqui TTS with default single-speaker English model
tts = TTS(model_name="tts_models/en/ljspeech/tacotron2-DDC", progress_bar=False, gpu=False)

# Generate and save output to .wav
tts.tts_to_file(text="Hi Felicia! This is your new TTS engine.", file_path="felicia.wav")

# Play the audio
sound = AudioSegment.from_wav("felicia.wav")
play(sound)