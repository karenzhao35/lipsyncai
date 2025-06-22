import React from 'react';

interface RizzInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onRetake: () => void;
}

const RizzInput = ({ prompt, setPrompt, onSubmit, onRetake }: RizzInputProps) => {
  return (
    <form className="controls" onSubmit={onSubmit}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Fine-tune your rizz..."
        className="rizz-input"
      />
      <button type="submit" className="btn btn-primary">
        Start
      </button>
      <button
        type="button"
        onClick={onRetake}
        className="btn btn-secondary"
      >
        🔄 Retake Photo
      </button>
    </form>
  );
};

export default RizzInput; 