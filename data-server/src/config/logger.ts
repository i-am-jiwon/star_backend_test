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
        new winston.transports.File({ filename: path.join(__dirname, '../../Log/DataError.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(__dirname, '../../Log/DataCombined.log') })
    ]
});

// 개발 환경에서는 디버그 로그도 콘솔에 출력
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

export default logger;