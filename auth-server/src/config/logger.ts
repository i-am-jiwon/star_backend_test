import winston from 'winston';
import path from 'path';

// 로그 형식 지정
const { combine, timestamp, printf } = winston.format;
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

// Winston 로거 생성
const logger = winston.createLogger({
    level: 'info', // 로그 레벨 설정
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        // 콘솔로 로그 출력
        new winston.transports.Console(),

        // 파일로 로그 출력
        new winston.transports.File({ filename: path.join(__dirname, '../../Log/AuthError.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(__dirname, '../../Log/AuthCombined.log') })
    ]
});


export default logger;