import { useState, useEffect, useCallback } from 'react';
import { Audio } from 'expo-av';

export const useTimer = (duration: number, onComplete: () => void) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [winsound, setWinSound] = useState<Audio.Sound | null>(null);

    const loadSound = useCallback(async () => {
        try {
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
            });
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/beep.mp3')
            );
            setSound(sound);
        } catch (error) {
            console.error('Erreur lors du chargement du son:', error);
        }
    }, []);

    const loadWinSound = useCallback(async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/win.mp3')
            );
            setWinSound(sound);
        } catch (error) {
            console.error('Erreur lors du chargement du son de victoire:', error);
        }
    }, []);

    useEffect(() => {
        loadSound();
        loadWinSound();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
            if (winsound) {
                winsound.unloadAsync();
            }
        };
    }, [loadSound, loadWinSound]);

    useEffect(() => {
        setTimeLeft(duration);
    }, [duration]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        if (sound) {
                            sound.replayAsync();
                        }
                        onComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, sound, onComplete]);

    const start = () => {
        setIsRunning(true);
        setTimeLeft(duration);
    };

    const stop = () => {
        setIsRunning(false);
    };

    const reset = () => {
        setIsRunning(false);
        setTimeLeft(duration);
    };

    const playWinSound = async () => {
        if (winsound) {
            try {
                await winsound.replayAsync();
            } catch (error) {
                console.error('Erreur lors de la lecture du son de victoire:', error);
            }
        }
    };

    return {
        timeLeft,
        isRunning,
        start,
        stop,
        reset,
        playWinSound,
    };
};
