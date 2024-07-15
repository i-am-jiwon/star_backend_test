"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSession = void 0;
exports.createSession = createSession;
exports.userSession = {};
// 유저의 세션 생성
function createSession(email) {
    // sessionId 설정
    const sessionId = String(Object.keys(exports.userSession).length + 1);
    // 세션 변수
    const session = { sessionId, email, valid: true };
    // 만든 세션을 userSession에 추가
    exports.userSession[sessionId] = session;
    return session;
}
