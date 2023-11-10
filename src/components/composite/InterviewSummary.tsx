import {Container, List, Typography, Box} from "@mui/material";
import {InterviewSummary} from ".prisma/client";

interface IInterviewSummaryProps {
    summary: InterviewSummary
}

export const InterviewSummaryComp = ({summary}: IInterviewSummaryProps) => {
    return <Container>
        <Box sx={{
            border: "2px solid #43ff56",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "justify",
            marginBottom: "20px"
        }}>
            <Typography variant={"h4"}>Strengths</Typography>
            <List>
                {
                    summary.strengths.map((s, i) => <li key={i}>{s}</li>)
                }
            </List>
        </Box>
        <Box sx={{
            border: "2px solid #ffaa3d",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "justify",
            marginBottom: "20px"
        }}>
            <Typography variant={"h4"}>Weaknesses</Typography>
            <List>
                {
                    summary.weaknesses.map((s, i) => <li key={i}>{s}</li>)
                }
            </List>
        </Box>
        <Box sx={{
            border: "2px solid #3daaee",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "justify",
            marginBottom: "20px"
        }}>
            <Typography variant={"h4"}>Opportunities</Typography>
            <List>
                {
                    summary.opportunities.map((s, i) => <li key={i}>{s}</li>)
                }
            </List>
        </Box>
        <Box sx={{
            border: "2px solid #ff3d3d",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "justify",
            marginBottom: "20px"
        }}>
            <Typography variant={"h4"}>Threats</Typography>
            <List>
                {
                    summary.threats.map((s, i) => <li key={i}>{s}</li>)
                }
            </List>
        </Box>
        <Box sx={{
            backgroundColor: "#3daaee",
            color: "white",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "justify",
            marginBottom: "20px"
        }}>
            <Typography variant={"h4"}>Feedback (Score {summary.score})</Typography>
            <Typography variant={"body1"}>{summary.feedback}</Typography>
        </Box>
    </Container>
}