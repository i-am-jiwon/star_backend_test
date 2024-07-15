"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMember = createMember;
exports.getMember = getMember;
exports.getMemberById = getMemberById;
exports.handleUserLogin = handleUserLogin;
const adminData = __importStar(require("../data/Member"));
const userSession_1 = require("../data/userSession");
const jwt_1 = require("../jwt/jwt");
const crypto_1 = __importDefault(require("crypto"));
// 생성 후 insertId를 리턴하도록 설계
function createMember(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newAdminInfo = req.body;
        const result = yield adminData.createMember(newAdminInfo);
        if (result.success) {
            res.status(201).json(result);
        }
        else {
            res.status(409).json({ message: result.message }); // HTTP 409 Conflict 상태 코드 사용
        }
    });
}
// 모든 admin user 들을 배열로 전송하도록 설계
function getMember(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminInfo = yield adminData.getMember();
        res.send(adminInfo);
    });
}
// 특정 회원 정보를 가져오는 함수
function getMemberById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const user = yield adminData.getMemberById(id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    });
}
// function for handle user login
function handleUserLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // user가 입력한 email, password를 변수로 저장
        const { id, password, salt } = req.body;
        // email을 통해 user 정보 접근
        const user = yield adminData.getMemberById(id);
        // 만약 db에 password와 id 정보가 없다면 401 리턴
        if (!user) {
            return res.status(401).send("등록된 아이디가 존재하지 않습니다.");
        }
        // 입력한 password를 salt와 함께 해시화하여 비교
        const hashedPassword = crypto_1.default
            .createHash('sha256')
            .update(salt + password) // 저장된 salt와 입력한 비밀번호를 조합
            .digest('hex');
        if (user.password !== hashedPassword) {
            return res.status(401).send("비밀번호가 유효하지 않습니다.");
        }
        // 입력한 email을 통해 session 생성
        const session = (0, userSession_1.createSession)(id);
        // access token과 refresh token 생성
        // access token과 refresh token의 만료 주기는 각각 5분, 1년으로 설정
        const accessToken = (0, jwt_1.signJWT)({
            id: user.id, sessionId: session.sessionId
        }, "5s");
        const refreshToken = (0, jwt_1.signJWT)({
            sessionId: session.sessionId
        }, "1y");
        // 쿠키에 accessToken과 refreshToken을 담음
        res.cookie("accessToken", accessToken, {
            maxAge: 300000, // 5분
            httpOnly: true,
        });
        res.cookie("refreshToken", refreshToken, {
            maxAge: 3.154e10, // 1년
            httpOnly: true,
        });
        // 유저에게 session 반환
        return res.status(200).send(session);
    });
}
