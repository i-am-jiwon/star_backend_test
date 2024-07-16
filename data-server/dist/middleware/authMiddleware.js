"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../config/logger")); // 로거 임포트
const PUBLIC_KEY = fs_1.default.readFileSync('./public.key', 'utf8');
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        logger_1.default.warn('Authorization token이 없습니다.');
        return res.status(401).json({
            status: 401,
            message: 'Authorization token이 없습니다.'
        });
    }
    jsonwebtoken_1.default.verify(token, PUBLIC_KEY, (err, decoded) => {
        if (err) {
            logger_1.default.error('JWT 검증 오류: ' + err.message);
            return res.status(403).json({
                status: 403,
                error: err.message
            });
        }
        req.user = decoded;
        logger_1.default.info(`User ${req.user.id} jwt authenticated successfully`);
        next();
    });
};
exports.authenticateToken = authenticateToken;
const authorizeRole = (minRole) => {
    return (req, res, next) => {
        var _a, _b, _c;
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        if (userRole === undefined || userRole <= minRole) {
            logger_1.default.warn(`User ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.id} does not have access to this resource`);
            return res.status(403).json({
                status: 403,
                message: '지정한 리소스에 대한 액세스가 금지되었습니다.'
            });
        }
        logger_1.default.info(`User ${(_c = req.user) === null || _c === void 0 ? void 0 : _c.id} authorized with role ${userRole}`);
        next();
    };
};
exports.authorizeRole = authorizeRole;
