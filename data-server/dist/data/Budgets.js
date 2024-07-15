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
exports.deleteBudget = exports.updateBudget = exports.createBudget = exports.getBudgetById = exports.getBudgets = void 0;
const database_1 = require("../config/database");
const getBudgets = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.db.query('SELECT * FROM budgets');
    return rows;
});
exports.getBudgets = getBudgets;
const getBudgetById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.db.query('SELECT * FROM budgets WHERE id = ?', [id]);
    const budgets = rows;
    return budgets[0] || null;
});
exports.getBudgetById = getBudgetById;
const createBudget = (budget) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.query('INSERT INTO budgets (name, amount) VALUES (?, ?)', [budget.name, budget.amount]);
});
exports.createBudget = createBudget;
const updateBudget = (id, budget) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.query('UPDATE budgets SET name = ?, amount = ? WHERE id = ?', [budget.name, budget.amount, id]);
});
exports.updateBudget = updateBudget;
const deleteBudget = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.query('DELETE FROM budgets WHERE id = ?', [id]);
});
exports.deleteBudget = deleteBudget;
