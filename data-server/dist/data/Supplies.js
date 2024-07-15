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
exports.deleteSupply = exports.updateSupply = exports.createSupply = exports.getSupplyById = exports.getSupplies = void 0;
const database_1 = require("../config/database");
const getSupplies = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.db.query('SELECT * FROM supplies');
    return rows;
});
exports.getSupplies = getSupplies;
const getSupplyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.db.query('SELECT * FROM supplies WHERE id = ?', [id]);
    const supplies = rows;
    return supplies[0] || null;
});
exports.getSupplyById = getSupplyById;
const createSupply = (supply) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.query('INSERT INTO supplies (name, price) VALUES (?, ?)', [supply.name, supply.price]);
});
exports.createSupply = createSupply;
const updateSupply = (id, supply) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.query('UPDATE supplies SET name = ?, price = ? WHERE id = ?', [supply.name, supply.price, id]);
});
exports.updateSupply = updateSupply;
const deleteSupply = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.query('DELETE FROM supplies WHERE id = ?', [id]);
});
exports.deleteSupply = deleteSupply;
