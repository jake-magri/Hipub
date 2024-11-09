import React, { useState, useRef, ReactNode, createContext, useContext } from 'react';

// Import the audio file
import crowdNoise from '../../public/sounds/crowdnoise.mp3'; 

// Create a context to manage sound
interface SoundContextType {
  playSound: () => void;
  pauseSound: () => void;
  isPlaying: boolean;
}

// Default value 
const SoundContext = createContext<SoundContextType | undefined>(undefined);

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<HTMLAudioElement | null>(null);

  // Function to play the sound
  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  // Function to pause the sound
  const pauseSound = () => {
    if (soundRef.current) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <SoundContext.Provider value={{ playSound, pauseSound, isPlaying }}>
      {/* Use the imported sound source */}
      <audio ref={soundRef} loop>
        <source src={crowdNoise} type="audio/mp3" />
      </audio>
      {children}
    </SoundContext.Provider>
  );
};

// Custom hook to use the Sound context
export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
