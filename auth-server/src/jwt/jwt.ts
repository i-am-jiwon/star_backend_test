import jwt from "jsonwebtoken";

// jwt sign과 verify를 위한 secret key
const PRIVATE_KEY = `1234`;

const PUBLIC_KEY = `5678`

export function signJWT(payload : object, expiresIn : string | number) {
    // payload와 secret key, expire time을 인자로 넣어 jwt 토큰 생성
    return jwt.sign(payload, PRIVATE_KEY, {algorithm : "RS256", expiresIn})
}

export function verifyJWT(token : string) {
    try {
        // 인자로 받은 token이 유효한지 확인하는 변수 (유효하다면 decoded가 존재)
        const decoded = jwt.verify(token, PUBLIC_KEY);
        // 유효하다면 payload에 decoded를 넣고 expired에 false로 리턴(만료되지 x)
        return { payload : decoded, expired : false };
    } catch (error : any) {
        // 만약 유효하지 않다면 payload는 Null, expired엔 errorMessage를 담아 리턴
        return { payload : null, expired: error.message.includes("jwt expired")};
    }
}