"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env') });
const pool = mysql2_1.default.createPool({
    host: 'localhost', // 호스트 주소
    user: process.env.DB_USER, // mysql user
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3003,
});
exports.db = pool.promise();
