import pdf from "pdf-parse";
import {QuestionFromResume} from "@/modules/ai/questionStrategy/QuestionFromResume";
import {Interview} from ".prisma/client";
import {prisma} from "@/modules/db";

export class InterviewFactory {
    private static _instance?: InterviewFactory;
    private constructor() { }
    static get instance(): InterviewFactory {
        if (!InterviewFactory._instance) {
            InterviewFactory._instance = new InterviewFactory();
        }
        return InterviewFactory._instance;
    }
    async createInterview(resumeFile: File, userId: string): Promise<Interview> {
        const dataBuffer = Buffer.from(await resumeFile.arrayBuffer())
        const pdfData = await pdf(dataBuffer)
        const resume = pdfData.text
        const questionFromResume = new QuestionFromResume()
        const questions = await questionFromResume.prompt(resume)
        return prisma.interview.create({
            data: {
                remainingQuestions: questions,
                transcript: [],
                summary: null,
                userId: userId
            }
        })
    }
}