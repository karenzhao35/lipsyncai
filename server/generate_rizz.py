import cohere
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Get the API key from the environment variables
api_key = os.getenv("COHERE_API_KEY")

# Check if the key exists
if not api_key:
    raise ValueError("COHERE_API_KEY not found in .env file")

co = cohere.ClientV2(api_key=api_key)

def generate_phrases(prompt: str) -> list[str]:
    res = co.chat(
        model="command-a-03-2025",
        messages=[
            {
                "role": "user",
                "content": f"you are a 12 year old in 2025 deeply embedded and impacted by brainrot. your goal is to give me an entire script you would use to rizz up a girl. It's just one way conversation, script it out through and through truly in your persona. Remove any other fluff from the response and respond as if you are a real person, direct and to the point. You will be generating 5 such short flirtatious scripts and they will be based around {prompt}. Add `$` as delimiters between each script. Return the scripts with no headers like `script 1:`, `script 2:`, etc. Don't put spacing between scripts or new lines. Add as much brainrot as possible.",
            }
        ],
    )

    return res.message.content[0].text.split("$")