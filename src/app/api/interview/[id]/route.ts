import {NextRequest, NextResponse} from "next/server";
import {AuthHandler} from "@/modules/user/AuthHandler";
import {InterviewManager} from "@/modules/interview/InterviewManager";
import {InterviewSummarizer} from "@/modules/interview/InterviewSummarizer";

export const GET = async (req: NextRequest, {params}: {params: {id: string}}) => {
    const userId = await AuthHandler.instance.getUserId(req)
    if (!userId) {
        throw new Error('User not found')
    }
    const interviewId = params.id
    const interview = await InterviewManager.instance.getInterview(interviewId)
    if (interview.userId !== userId) {
        throw new Error('Unauthorized')
    }
    return NextResponse.json({
        summary: await InterviewSummarizer.instance.summarize(interview),
        isComplete: interview.isComplete
    })
}