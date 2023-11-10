'use client'
import { AppBar, Box, Button, Typography } from '@mui/material'
import {useAuth} from "@/hooks/useAuth";
import {GoogleLoginButton } from "react-social-login-buttons";

export const Navbar = () => {
    const {googleLogin, logout, user} = useAuth()

    return (
        <AppBar
            position="static"
            color={'secondary'}
            sx={{
                padding: '1rem',
            }}
        >
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant={'h4'} >
                    AI Interviewer
                </Typography>
                {user ? <Button onClick={logout} variant={'contained'}>
                    Logout
                </Button> : <span><GoogleLoginButton onClick={googleLogin}/></span>}
            </Box>
        </AppBar>
    )
}