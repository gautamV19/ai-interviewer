import {NextRequest} from "next/server";
import {Client, Account} from 'node-appwrite'
import {InterviewManager} from "@/modules/interview/InterviewManager";

export class AuthHandler {
    static _instance: AuthHandler;
    static get instance(): AuthHandler {
        if (!AuthHandler._instance) {
            AuthHandler._instance = new AuthHandler();
        }
        return AuthHandler._instance;
    }

    private constructor() {
    }

    public async getUserId(req: NextRequest): Promise<string | null> {
        const token = req.headers.get("Authorization")?.split(" ")[1]
        if (!token) {
            return null
        }
        const client = new Client()
            .setEndpoint(process.env.APPWRITE_ENDPOINT!)
            .setProject(process.env.APPWRITE_PROJECT_ID!)
            .setKey(process.env.APPWRITE_SECRET!)
            .setJWT(token)
        const account = new Account(client)
        const user = await account.get()
        return user.$id
    }

    public async isAuthenticated(req: NextRequest, interviewId: string): Promise<boolean> {
        const user = await this.getUserId(req)
        if (!user) {
            return false
        }
        const interview = await InterviewManager.instance.getInterview(interviewId)
        return interview.userId === user;

    }
}