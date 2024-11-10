import React, { useState, useRef, ReactNode, createContext, useContext } from 'react';

// Import the audio files
import crowdNoise from '../../public/sounds/crowdnoise.mp3'; 
import jazz from '../../public/sounds/jazz.mp3'; 

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
  const crowdNoiseRef = useRef<HTMLAudioElement | null>(null);
  const jazzRef = useRef<HTMLAudioElement | null>(null);

  // Function to play both sounds
  const playSound = () => {
    if (crowdNoiseRef.current && jazzRef.current) {
      crowdNoiseRef.current.play();
      jazzRef.current.play();
      setIsPlaying(true);
    }
  };

  // Function to pause both sounds
  const pauseSound = () => {
    if (crowdNoiseRef.current && jazzRef.current) {
      crowdNoiseRef.current.pause();
      jazzRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <SoundContext.Provider value={{ playSound, pauseSound, isPlaying }}>
      {/* Separate audio elements for each sound */}
      <audio ref={crowdNoiseRef} loop>
        <source src={crowdNoise} type="audio/mpeg" />
      </audio>
      <audio ref={jazzRef} loop>
        <source src={jazz} type="audio/mpeg" />
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
