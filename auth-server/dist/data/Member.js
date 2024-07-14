"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMember = createMember;
exports.getMember = getMember;
const database_1 = require("./database");
function createMember(newAdminInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, password, salt, name, email, depart, duty, role } = newAdminInfo;
        // SQL 쿼리와 매개변수 배열
        const query = "INSERT INTO users (id, password, salt, name, email, depart, duty, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [id, password, salt, name, email || null, depart || null, duty || null, role];
        // 쿼리 실행
        const [result] = yield database_1.db.execute(query, values);
        // 삽입된 행의 insertId 반환
        const insertId = result.insertId;
        // 리턴 객체
        return {
            insertId,
            id,
            name,
            email,
            depart,
            duty,
            role,
        };
    });
}
function getMember() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM users";
        // 쿼리 실행
        const [rows] = yield database_1.db.execute(query);
        // 결과 반환
        return rows;
    });
}
