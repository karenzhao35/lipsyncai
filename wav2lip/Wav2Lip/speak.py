from TTS.api import TTS
from pydub import AudioSegment
from pydub.playback import play

# Initialize Coqui TTS with default single-speaker English model
tts = TTS(model_name="tts_models/en/ljspeech/tacotron2-DDC", progress_bar=False, gpu=False)

# Generate and save output to .wav
tts.tts_to_file(text="Hey, you’re like matcha—bitter at first but totally worth it. Wanna be my latte art cuz you’re already foamin’ in my mind. ', ' Yo, if you were a matcha cake, you’d be the top layer cuz you’re the sweetest part. Can I be the frosting that sticks to you? ', ' Girl, you’re like a matcha frap—refreshing, addictive, and I’m already craving more. You got that green tea glow, or is that just your aura? ', ' If loving you was a matcha shot, I’d take it straight, no sugar, cuz you’re already perfect. Be my boba cuz I’m stuck on you. ', ' You’re like a matcha latte—smooth, warm, and I wanna hold you in my hands all day. Can I be the lid that keeps you close", file_path="demo.wav")

# Play the audio
sound = AudioSegment.from_wav("demo.wav")
play(sound)