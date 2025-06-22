# quickstart.py
import time
import os
from dotenv import load_dotenv
from sync import Sync
from sync.common import Audio, GenerationOptions, Video
from sync.core.api_error import ApiError

# Load environment variables
load_dotenv()

def generate_lip_sync_video(image_path: str, audio_path: str, output_filename: str = "rizz_video") -> str:
    """
    Generate a lip sync video using Sync.so API
    
    Args:
        image_path: Path to the input image file
        audio_path: Path to the input audio file
        output_filename: Name for the output video file
    
    Returns:
        Path to the generated video file
    """
    
    # Get API key from environment variables
    api_key = os.getenv("SYNC_API_KEY")
    if not api_key:
        raise ValueError("SYNC_API_KEY not found in environment variables")
    
    # Check if input files exist
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image file not found: {image_path}")
    
    if not os.path.exists(audio_path):
        raise FileNotFoundError(f"Audio file not found: {audio_path}")
    
    # Initialize Sync client
    client = Sync(
        base_url="https://api.sync.so", 
        api_key=api_key
    ).generations
    
    print(f"Starting lip sync generation for {image_path} and {audio_path}...")
    
    try:
        # Create the generation request
        response = client.create(
            input=[Video(url=image_path), Audio(url=audio_path)],
            model="lipsync-2",
            options=GenerationOptions(sync_mode="cut_off"),
            outputFileName=output_filename
        )
    except ApiError as e:
        print(f'Create generation request failed with status code {e.status_code} and error {e.body}')
        raise
    
    job_id = response.id
    print(f"Generation submitted successfully, job id: {job_id}")
    
    # Poll for completion
    generation = client.get(job_id)
    status = generation.status
    while status not in ['COMPLETED', 'FAILED']:
        print(f'Polling status for generation {job_id}...')
        time.sleep(10)
        generation = client.get(job_id)
        status = generation.status
    
    if status == 'COMPLETED':
        print(f'Generation {job_id} completed successfully, output url: {generation.output_url}')
        # Download the video and save it locally
        output_path = f"uploads/{output_filename}.mp4"
        # TODO: Download the video from generation.output_url and save to output_path
        return output_path
    else:
        print(f'Generation {job_id} failed')
        raise Exception(f"Video generation failed for job {job_id}")

# Example usage (for testing)
if __name__ == "__main__":
    try:
        result = generate_lip_sync_video(
            image_path="uploads/face.png",
            audio_path="audio/example.wav",
            output_filename="test_rizz"
        )
        print(f"Video generated successfully: {result}")
    except Exception as e:
        print(f"Error: {e}")