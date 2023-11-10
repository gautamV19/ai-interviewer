import {InterviewSummarizerStrategy} from "@/modules/ai/interviewSummarizerStrategy/InterviewSummarizerStrategy";
import {Interview, InterviewSummary} from ".prisma/client";
import {prisma} from "@/modules/db";
export class InterviewSummarizer{
    private static _instance: InterviewSummarizer;
    static get instance(): InterviewSummarizer {
        if (!InterviewSummarizer._instance) {
            InterviewSummarizer._instance = new InterviewSummarizer();
        }
        return InterviewSummarizer._instance;
    }
    private constructor() { }
    public async summarize(interview: Interview): Promise<InterviewSummary> {
        let summary = interview?.summary
        
        if(summary){
            return summary
        }

        summary = (await prisma.interview.findUnique({
            where: {
                id: interview.id
            }
        }))?.summary || null

        if(summary){
            return summary
        }
        
        const interviewSummarizerStrategy = new InterviewSummarizerStrategy()
        summary = await interviewSummarizerStrategy.prompt(interview.transcript)

        await prisma.interview.update({
            where: {
                id: interview.id
            },
            data: {
                summary: summary
            }
        })

        return summary
    }
}