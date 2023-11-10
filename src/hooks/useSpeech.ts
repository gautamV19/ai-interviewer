import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import {useEffect} from "react";

export const useSpeech = () => {
    const {
        finalTranscript,
        resetTranscript,
        listening
    } = useSpeechRecognition()

    const speak = (text: string) => {
        if (!('speechSynthesis' in window)) return
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = "en-IN"
        utterance.rate = 1.4
        window.speechSynthesis.speak(utterance)
        const startListening = async () => {
            await SpeechRecognition.startListening({
                continuous: true
            })
        }

        utterance.addEventListener("end", startListening)

    }

    useEffect(() => {
        window.speechSynthesis.getVoices()
    }, []);

    return {
        finalTranscript,
        resetTranscript,
        listening,
        stopListening: SpeechRecognition.stopListening,
        speak
    }
}