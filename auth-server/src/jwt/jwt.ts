import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// jwt sign과 verify를 위한 secret key
const PRIVATE_KEY = fs.readFileSync('./private.key', 'utf8');

export function signJWT(payload : object, expiresIn : string | number) {
    // payload와 secret key, expire time을 인자로 넣어 jwt 토큰 생성
    return jwt.sign(payload, PRIVATE_KEY, {algorithm : "RS256", expiresIn})
}

