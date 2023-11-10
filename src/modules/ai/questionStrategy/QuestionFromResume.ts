import {QuestionStrategy} from "./QuestionStrategy";
import {Configuration, OpenAIApi} from "openai";

export class QuestionFromResume extends QuestionStrategy<string> {
    async prompt(input: string): Promise<string[]> {
        const openAI = new OpenAIApi(new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        }));
        const response = await openAI.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `Given a resume by the user, generate 20 to 30 Interview questions and return as a array of strings. Every question should be less than 40 words.
                    "Start with some informal question addressing the interviewee with name and end with some behavioural questions.
                    Don't add any numbering or any explanation.`
                }, {
                    role: "user",
                    content: input
                }, {
                    role: "assistant",
                    content: "Here is the complete content of questions.json"
                }
            ],
            temperature: 1,
            n: 1
        })
        const rawAnswer = response.data.choices[0].message?.content
        if(!rawAnswer) {
            throw new Error("No answer from OpenAI")
        }

        const start = rawAnswer.indexOf("[")
        const end = rawAnswer.lastIndexOf("]")
        const answer = rawAnswer.substring(start, end+1)

        return JSON.parse(answer) as string[]
    }
}