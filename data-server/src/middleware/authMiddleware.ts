import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const PUBLIC_KEY = fs.readFileSync('./public.key', 'utf8');

interface CustomRequest extends Request {
    user?: { [key: string]: any };
}


export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Authorization token이 없습니다.'
        });
    }

    jwt.verify(token, PUBLIC_KEY, (err: any, decoded) => {
        if (err) {
            console.log("jwt error");
            res.status(405).json({
                status: 405,
                error: err
            });
            next(err);
        }

        req.user = decoded as { [key: string]: any };
        next();
    });


};

export const authorizeRole = (minRole: number) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;

        if (userRole === undefined || userRole <= minRole) {
            return res.status(403).json({
                status: 403,
                message: '지정한 리소스에 대한 액세스가 금지되었습니다.'
            });
        }

        next();
    };
};
