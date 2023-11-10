import {useAuth} from "@/hooks/useAuth";

export const useInterview = () => {
    const {account} = useAuth()
    const startInterview = async (file: File) =>{
        const formData = new FormData()
        formData.append("file", file!)
        const jwt = await account.createJWT()
        const res = await fetch("/api/interview", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt.jwt}`
            },
            body: formData
        })
        return (await res.json())
    }

    const answerCurrent = async (answer: string, id: string) => {
        const jwt = await account.createJWT()
        return await (await fetch( `/api/interview/${id}/interact`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt.jwt}`,
            },
            body: JSON.stringify({
                answer: answer,
            })
        })).json()
    }

    const getInterview = async (id: string) => {
        const jwt = await account.createJWT()
        try {
            return await (await fetch(`/api/interview/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwt.jwt}`,
                },
            })).json()
        } catch (e) {
            window.location.href = `/${id}`
        }
    }

    const getNextQuestion = async (id: string) => {
        const jwt = await account.createJWT()
        return await (await fetch(`/api/interview/${id}/interact`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt.jwt}`,
            },
        })).json()
    }

    return {startInterview, answerCurrent, getInterview, getNextQuestion}
}