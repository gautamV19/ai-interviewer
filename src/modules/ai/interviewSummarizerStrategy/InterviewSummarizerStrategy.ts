import {AiModel} from "../AiModel";
import {Configuration, OpenAIApi} from "openai";
import {InterviewSummary, TranscriptMessage} from ".prisma/client";

export class InterviewSummarizerStrategy implements AiModel<TranscriptMessage[], InterviewSummary> {
    async prompt(input: TranscriptMessage[]): Promise<InterviewSummary> {
        const openAI = new OpenAIApi(new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        }))
        const datatype = `type InterviewSummary = {
        strengths: string[],
        weaknesses: string[],
        opportunities: string[],
        threats: string[],
        score: number
        feedback: string
}`
        const response = await openAI.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Analyze and criticize the Interviewee using the transcript of an Interview provided by the user and give feedback on it. Your output must be a pure json file representing an object of this class with no other comments or explanation .\n" + datatype
                }, {
                    role: "user",
                    content: `I'm an interviewee and here is my transcript of one interview, \n\n\n${input}\n`
                }, {
                    role: "assistant",
                    content: "Here is the content of interviewSummary.json"
                }
            ]
        })
        return JSON.parse(response.data.choices[0].message?.content || "{}")
    }
}