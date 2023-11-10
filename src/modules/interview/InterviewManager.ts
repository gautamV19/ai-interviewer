import {InterviewFactory} from "@/modules/interview/InterviewFactory";
import {Interview, InterviewSummary, TranscriptMessageTypes} from ".prisma/client";
import {prisma} from "@/modules/db";
import {InterviewSummarizer} from "@/modules/interview/InterviewSummarizer";

export class InterviewManager {
    private static _instance?: InterviewManager;
    private constructor() { }
    static get instance(): InterviewManager {
        if (!InterviewManager._instance) {
            InterviewManager._instance = new InterviewManager();
        }
        return InterviewManager._instance;
    }
    async startInterview(userId: string, resume: File): Promise<string> {
        const interview = await InterviewFactory.instance.createInterview(resume, userId);
        return interview.id
    }

    async getInterviewSummary(interviewId: string): Promise<InterviewSummary> {
        const interview = await this.getInterview(interviewId)
        if (!interview.isComplete) {
            throw new Error('Interview not complete')
        }
        if(interview.summary){
            return interview.summary
        }
        const summarizer = InterviewSummarizer.instance
        const summary = await summarizer.summarize(interview)
        await prisma.interview.update({
            where: {
                id: interviewId
            },
            data: {
                summary: summary
            }
        })
        return summary
    }

    async getNextQuestion(interviewId: string ): Promise<string> {
        const interview = await this.getInterview(interviewId)
        const nextQuestion =  interview.remainingQuestions[0]
        if (!nextQuestion) {
            throw new Error('No more questions')
        }
        return nextQuestion
    }

    async answerCurrentQuestion(interviewId: string, answer: string): Promise<void> {
        const interview = await this.getInterview(interviewId)
        const lastQuestion = interview.remainingQuestions.shift()
        if (!lastQuestion) {
            throw new Error('No more questions')
        }
        interview.transcript.push({
            type: TranscriptMessageTypes.QUESTION,
            message: lastQuestion
        })
        interview.transcript.push({
            type: TranscriptMessageTypes.ANSWER,
            message: answer
        })
        await prisma.interview.update({
            where: {
                id: interviewId
            },
            data: {
                transcript: interview.transcript,
                remainingQuestions: [...interview.remainingQuestions],
                isComplete: interview.remainingQuestions.length === 0
            }
        })
    }

    async getInterview(interviewId: string): Promise<Interview> {
        const interview = await prisma.interview.findUnique({
            where: {
                id: interviewId
            }
        })
        if (!interview) {
            throw new Error('Interview not found')
        }
        return interview
    }
}

