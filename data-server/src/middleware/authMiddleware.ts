import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import logger from '../config/logger'; // 로거 임포트

const PUBLIC_KEY = fs.readFileSync('./public.key', 'utf8');

interface CustomRequest extends Request {
    user?: { [key: string]: any };
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        logger.warn('Authorization token이 없습니다.');
        return res.status(401).json({
            status: 401,
            message: 'Authorization token이 없습니다.'
        });
    }

    jwt.verify(token, PUBLIC_KEY, (err: any, decoded) => {
        if (err) {
            logger.error('JWT 검증 오류: ' + err.message);
            return res.status(403).json({
                status: 403,
                error: err.message
            });
        }

        req.user = decoded as { [key: string]: any };
        logger.info(`User ${req.user.id} jwt authenticated successfully`);
        next();
    });
};

export const authorizeRole = (minRole: number) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;

        if (userRole === undefined || userRole <= minRole) {
            logger.warn(`User ${req.user?.id} does not have access to this resource`);
            return res.status(403).json({
                status: 403,
                message: '지정한 리소스에 대한 액세스가 금지되었습니다.'
            });
        }

        logger.info(`User ${req.user?.id} authorized with role ${userRole}`);
        next();
    };
};
