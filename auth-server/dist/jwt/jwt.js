"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJWT = signJWT;
exports.verifyJWT = verifyJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// jwt sign과 verify를 위한 secret key
const PRIVATE_KEY = `1234`;
const PUBLIC_KEY = `5678`;
function signJWT(payload, expiresIn) {
    // payload와 secret key, expire time을 인자로 넣어 jwt 토큰 생성
    return jsonwebtoken_1.default.sign(payload, PRIVATE_KEY, { algorithm: "RS256", expiresIn });
}
function verifyJWT(token) {
    try {
        // 인자로 받은 token이 유효한지 확인하는 변수 (유효하다면 decoded가 존재)
        const decoded = jsonwebtoken_1.default.verify(token, PUBLIC_KEY);
        // 유효하다면 payload에 decoded를 넣고 expired에 false로 리턴(만료되지 x)
        return { payload: decoded, expired: false };
    }
    catch (error) {
        // 만약 유효하지 않다면 payload는 Null, expired엔 errorMessage를 담아 리턴
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
}
