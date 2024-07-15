"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const PUBLIC_KEY = fs_1.default.readFileSync('./public.key', 'utf8');
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    jsonwebtoken_1.default.verify(token, PUBLIC_KEY, (err, decoded) => {
        if (err) {
            if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return res.status(403).json({ message: 'Invalid token format' });
            }
            else if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return res.status(403).json({ message: 'Token has expired' });
            }
            else if (err instanceof jsonwebtoken_1.default.NotBeforeError) {
                return res.status(403).json({ message: 'Token is not yet valid' });
            }
            else {
                return res.status(403).json({ message: 'Invalid token' });
            }
        }
        req.user = decoded;
        next();
    });
};
exports.authenticateToken = authenticateToken;
const authorizeRole = (minRole) => {
    return (req, res, next) => {
        var _a;
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        console.log(req);
        if (userRole === undefined || userRole <= minRole) {
            return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
