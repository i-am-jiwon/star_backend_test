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
        const { id, password, salt, name, role, email, tel, depart, duty, } = newAdminInfo;
        const query = "INSERT INTO users (id, password, salt, name, role, email, tel, depart, duty) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return database_1.db
            .execute(query, [
            id,
            password,
            salt,
            name,
            role,
            email,
            tel,
            depart,
            duty,
        ])
            .then((result) => result[0].insertId);
    });
}
function getMember() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT id, name, email, depart, duty, role FROM users";
        return database_1.db.execute(query).then((result) => result[0]);
    });
}
