import React from "react";
import {Button, Container} from "@mui/material";
import {FileUploader} from "@/components/base/FileUploader";
import {useInterview} from "@/hooks/useInterview";


export const ResumeUploader = () => {
    const [file, setFile] = React.useState<File>()
    const {startInterview} = useInterview()

    return <Container>
        <FileUploader
            accept={"application/pdf"}
            onChange={(e) => {
                const file = e.currentTarget.files?.[0]
                if (!file) return
                setFile(file)
            }}
            label={file ? "Change" : "Upload Resume"}
            style={{
                textTransform: "none",
                backgroundColor: file ? "#4caf50" : "#2196f3",
            }}
        />
        {file && <Button
            variant={"contained"}
            sx={{
                marginLeft: "20px"
            }}
            onClick={async () => {
                const interviewId = (await startInterview(file)).id
                window.location.href = `/${interviewId}`
            }}
        > Start Interview </Button>}
    </Container>
}