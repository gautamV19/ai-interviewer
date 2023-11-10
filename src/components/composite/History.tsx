import {Box, Button, Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "@/hooks/useAuth";

export const History = () => {
    const [history, setHistory] = useState<any[]>([])
    const {account, user} = useAuth()
    useEffect(() => {
        if (!user) return
        account.createJWT().then((token: {jwt: string}) => {
            axios.get('/api/interview', {
                headers: {
                    Authorization: `Bearer ${token.jwt}`
                }
            }).then((res: any) => {
                setHistory(res.data)
            })
        })
    }, [user]);
    return (
        <Container>
            {
                history.map((item) => {
                    return <HistoryItem key={item.id} id={item.id} isComplete={item.isComplete} createdAt={item.createdAt}/>
                })
            }
        </Container>
    )
}

const HistoryItem = (props:{
    isComplete: boolean,
    createdAt: string ,
    id: string
}) => {
    const date = new Date(props.createdAt)
    return (
        <Box sx={{
            border: "1px solid black",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px"
        }}>
            <Typography>
                Interviewed on {date.getDate().toString()}/{date.getMonth().toString()}/{date.getFullYear().toString()}
            </Typography>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Typography bgcolor={ props.isComplete ? "green" : "red" } borderRadius={"5px"} padding={"5px"} >
                    {props.isComplete ? "Completed" : "Incomplete"}
                </Typography>
                {
                    !props.isComplete && <Button
                        variant={"contained"}
                        color={"success"}
                        href={`/${props.id}/play`}
                    >Complete it now</Button>
                }
            </Box>
        </Box>
    )
}