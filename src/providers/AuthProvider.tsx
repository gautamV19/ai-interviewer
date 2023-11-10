"use client";

import React, {createContext, useEffect, useState} from "react";
// @ts-ignore
import {Account, Client, Models} from "appwrite";
import User = Models.User;

export const AuthContext = createContext<{
    user: User,
    setUser: (user:User) => void,
    account: Account
}>({
    user: null,
    setUser: (user:any) => {},
    account: null
})
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
const account = new Account(client);

export const AuthProvider = ({children}:any) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    useEffect(() => {
        if(!account){
            return
        }
        account.get()
            .then((user: User<any>) => setUser(user))
            .catch(()=>setUser(null))
    }, [])
    return (
        <AuthContext.Provider value={{user, setUser, account}}>
            {children}
        </AuthContext.Provider>
    )
}