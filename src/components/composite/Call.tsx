"use client";

import 'regenerator-runtime/runtime'

import {Avatar, Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useInterview} from "@/hooks/useInterview";
import {useSpeech} from "@/hooks/useSpeech";
import {useAuth} from "@/hooks/useAuth";

export const Call = ({id}: { id: string }) => {
    const {answerCurrent, getNextQuestion} = useInterview()
    const [isLoading, setIsLoading] = useState(true)
    const {user} = useAuth()
    const {
        finalTranscript,
        resetTranscript,
        listening,
        stopListening,
        speak
    } = useSpeech()

    const handleAnswering = async () => {
        setIsLoading(true)
        await stopListening()
        resetTranscript()
        await answerCurrent(finalTranscript, id)
        const question = await getNextQuestion(id)
        setIsLoading(false)
        speak(question.message)
    }
    useEffect(() => {
        const spaceKeyHandler = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                handleAnswering()
            }
        }
        window.addEventListener("keydown", spaceKeyHandler)
        return () => {
            window.removeEventListener("keydown", spaceKeyHandler)
        }
    }, [])

    useEffect(() => {
        if(!user) return;
        setIsLoading(true)
        getNextQuestion(id).then((question) => {
            speak(question.message)
            setIsLoading(false)
        })
    }, [user])
    return <>
        <Container sx={{
        paddingTop: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    }}>
        <Avatar sizes={"large"} sx={{
            width: 256,
            height: 256,
            border: isLoading ? "20px solid red" : !listening ? "20px solid green" : "none"
        }}>
            <img width={"100%"} height={"100%"} src={"https://avatars.githubusercontent.com/u/74463091?v=4"}/>
        </Avatar>
        <Avatar sizes={"large"} sx={{
            width: 256,
            height: 256,
            border: listening ? "20px solid blue" : "none"
        }}>
            {
                user?.name
            }
        </Avatar>


    </Container>
        <Typography width={"100%"} textAlign={"center"} >
            Press Space to Submit Answer
        </Typography>
    </>
}