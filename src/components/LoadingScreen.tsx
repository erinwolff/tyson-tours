import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onLoadComplete, 500);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div
      className={`loading-container ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo/Title */}
      <div className="mb-12">
        <h1 className="loading-title">
          TYSON TOURS
        </h1>
        <p className="text-center text-gray-400 text-lg mt-2 tracking-widest">
          LOADING EXPERIENCE
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-80 md:w-96">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="mt-2 text-center">
          <span className="text-emerald-500 font-mono text-sm">
            {Math.floor(Math.min(progress, 100))}%
          </span>
        </div>
      </div>

      {/* Loading messages */}
      <div className="mt-8 text-gray-500 text-sm tracking-wide">
        {progress < 30 && <p>Lighting the campfire...</p>}
        {progress >= 30 && progress < 60 && <p>Drawing the mountains...</p>}
        {progress >= 60 && progress < 90 && <p>Placing the stars...</p>}
        {progress >= 90 && <p>Ready for adventure...</p>}
      </div>
    </div>
  );
}
