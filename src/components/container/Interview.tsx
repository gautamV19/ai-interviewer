"use client";

import {useInterview} from "@/hooks/useInterview";
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";

export const Interview = ({id}: {id: string}) => {
    const {user} = useAuth()
    const {getInterview} = useInterview()
    const [interview, setInterview] = useState()

    useEffect(() => {
        if(!user) return
        getInterview(id).then((iv)=>{
            if(!iv) return
            if(!iv.isComplete){
                window.location.href = `/${id}/play`
            }
            setInterview(iv)
        })
    }, [user]);
    console.log(interview)
    return <>
    </>
}