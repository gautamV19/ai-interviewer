"use client";

import {ResumeUploader} from "@/components/composite/ResumeUploader";
import {History} from "@/components/composite/History";
import {Container} from "@mui/material";

export const Home = () => {
    const handleSubmit = async (file: File) => {
        console.log()
    }

    return (
        <Container sx={{
            paddingTop: "30px"
        }}>
            <ResumeUploader/>
            <History/>
        </Container>
    )
}