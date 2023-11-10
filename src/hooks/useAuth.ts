// @ts-ignore
import {Client, Account, Models} from "appwrite";
import React, {useContext} from "react";
import {AuthContext} from "@/providers/AuthProvider";
import User = Models.User;

const redirectURL = process.env.NODE_ENV === 'production' ? 'https://interview-ai.azurewebsites.net/' : 'http://localhost:3000'

export const useAuth = () => {
    const {user, setUser, account} = useContext(AuthContext)

    const googleLogin = () => {
        account.createOAuth2Session('google', redirectURL, 'https://google.com');
    }
    const githubLogin = () => {
        account.createOAuth2Session('github', redirectURL, 'https://github.com');
    }
    const facebookLogin = () => {
        account.createOAuth2Session('facebook', redirectURL, 'https://facebook.com');
    }
    const logout = async () => {
        await account.deleteSession('current')
        setUser(null)
    }

    return {googleLogin, githubLogin, facebookLogin, logout, user, account}
}