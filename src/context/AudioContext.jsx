import { createContext, useContext, useState } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {

    const [muted, setMuted] = useState(false);

    const toggleMute = () => {
        setMuted(prev => !prev);
    };

    return (
        <AudioContext.Provider
            value={{
                muted,
                toggleMute
            }}
        >
            <audio
                src="/audio/japanese-ambient.mp3"
                autoPlay
                loop
                muted={muted}
            />

            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    return useContext(AudioContext);
};