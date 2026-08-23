import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";

import {
    Volume2,
    VolumeX
} from "lucide-react";


const AudioContext = createContext();


export const AudioProvider = ({ children }) => {

    const [muted, setMuted] = useState(true);

    const audioRef = useRef(null);


    useEffect(() => {

        if (audioRef.current) {
            audioRef.current.volume = 0.5;
        }

    }, []);


    const toggleMute = async () => {

        const audio = audioRef.current;

        if (!audio) return;


        if (muted) {

            setMuted(false);

            try {

                audio.muted = false;

                audio.volume = 0.5;

                await audio.play();

            } catch (error) {

                console.log(
                    "Audio playback failed:",
                    error
                );

            }

        } else {

            audio.muted = true;

            setMuted(true);

        }

    };


    return (

        <AudioContext.Provider
            value={{
                muted,
                toggleMute
            }}
        >

            <audio
                ref={audioRef}
                src="/audio/japanese-ambient.mp3"
                autoPlay
                loop
                muted={muted}
                preload="auto"
            />


            <button
                type="button"
                className="global-audio-button"
                onClick={toggleMute}
                aria-label={
                    muted
                        ? "Unmute ambient music"
                        : "Mute ambient music"
                }
            >

                {muted ? (
                    <VolumeX size={20} />
                ) : (
                    <Volume2 size={20} />
                )}

            </button>


            {children}

        </AudioContext.Provider>

    );
};


export const useAudio = () => {

    return useContext(AudioContext);

};