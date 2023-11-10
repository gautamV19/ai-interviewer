import {NextRequest, NextResponse} from "next/server";
import {InterviewManager} from "@/modules/interview/InterviewManager";
import {AuthHandler} from "@/modules/user/AuthHandler";
import {prisma} from "@/modules/db";

export const POST = async (req: NextRequest, {params}: { params: { id: string } }) => {
    const interviewId = params.id
    if (!await AuthHandler.instance.isAuthenticated(req, interviewId)) {
        throw new Error("Not authorized")
    }
    const answer = (await req.json()).answer
    try {
        await InterviewManager.instance.answerCurrentQuestion(interviewId, answer)
        return NextResponse.json({
            message: "Success"
        })
    } catch (e) {
        await prisma.interview.update({
            where: {
                id: interviewId
            },
            data: {
                isComplete: true
            }
        })
    }
}

export const GET = async (req: NextRequest, {params}: { params: { id: string } }) => {
    const interviewId = params.id
    if (!await AuthHandler.instance.isAuthenticated(req, interviewId)) {
        throw new Error("Not authorized")
    }
    try {
        const question = await InterviewManager.instance.getNextQuestion(interviewId)
        return NextResponse.json({
            message: question
        })
    } catch (e) {
        await prisma.interview.update({
            where: {
                id: interviewId
            },
            data: {
                isComplete: true
            }
        })
    }
}