"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
// 로그 형식 지정
const { combine, timestamp, printf } = winston_1.default.format;
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});
// Winston 로거 생성
const logger = winston_1.default.createLogger({
    level: 'info', // 로그 레벨 설정
    format: combine(timestamp(), logFormat),
    transports: [
        // 콘솔로 로그 출력
        new winston_1.default.transports.Console(),
        // 파일로 로그 출력
        new winston_1.default.transports.File({ filename: 'DataError.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'DataCombined.log' })
    ]
});
// 개발 환경에서는 디버그 로그도 콘솔에 출력
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple()
    }));
}
exports.default = logger;
