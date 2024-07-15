interface IUserSession {
    sessionId: string;
    id: string;
    valid: boolean;
    accessToken?: string; // Optional property for accessToken
}

export const userSession: Record<string, IUserSession> = {};

// 유저의 세션 생성
import { v4 as uuidv4 } from 'uuid';

export function createSession(id: string, accessToken?: string) {
    const sessionId = uuidv4();
    const session = { sessionId, id, valid: true, accessToken };
    userSession[sessionId] = session;
    return session;
}
