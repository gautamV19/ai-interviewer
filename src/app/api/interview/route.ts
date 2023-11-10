import {NextRequest, NextResponse} from "next/server";
import {InterviewManager} from "@/modules/interview/InterviewManager";
import {AuthHandler} from "@/modules/user/AuthHandler";
import {prisma} from "@/modules/db";

export const POST = async (req: NextRequest) => {
    const pdfFile = ((await req.formData()).get('file') as File)
    const user = await AuthHandler.instance.getUserId(req)
    if (!user) {
        throw new Error('User not found')
    }
    return NextResponse.json({
        id:  await InterviewManager.instance.startInterview(user, pdfFile)
    })
}

export const GET = async (req: NextRequest) => {
    const user = await AuthHandler.instance.getUserId(req)
    if (!user) {
        throw new Error('User not found')
    }
    const userInterviews= await prisma.interview.findMany({
        where: {
            userId: user
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            summary: {
                select: {
                    score: true
                }
            },
            userId: true,
            createdAt: true,
            isComplete: true
        }
    })

    return NextResponse.json(userInterviews)
}