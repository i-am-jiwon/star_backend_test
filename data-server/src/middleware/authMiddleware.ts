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
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    jwt.verify(token, PUBLIC_KEY, (err: any, decoded) => {
        if (err) {
            if (err instanceof jwt.JsonWebTokenError) {
                return res.status(403).json({ message: 'Invalid token format' });
            } else if (err instanceof jwt.TokenExpiredError) {
                return res.status(403).json({ message: 'Token has expired' });
            } else if (err instanceof jwt.NotBeforeError) {
                return res.status(403).json({ message: 'Token is not yet valid' });
            } else {
                return res.status(403).json({ message: 'Invalid token' });
            }
        }

        req.user = decoded as { [key: string]: any };
        next();
    });


};

export const authorizeRole = (minRole: number) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;

        if (userRole === undefined || userRole <= minRole) {
            return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        }

        next();
    };
};
