"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const budgetData = __importStar(require("../data/Budgets"));
const getBudgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const budgets = yield budgetData.getBudgets();
        res.json(budgets);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching budgets' });
    }
});
exports.getBudgets = getBudgets;
const getBudgetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const budget = yield budgetData.getBudgetById(Number(req.params.id));
        if (budget) {
            res.json(budget);
        }
        else {
            res.status(404).json({ error: 'Budget not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching budget' });
    }
});
exports.getBudgetById = getBudgetById;
const createBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBudget = req.body;
        yield budgetData.createBudget(newBudget);
        res.status(201).json({ message: 'Budget created' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating budget' });
    }
});
exports.createBudget = createBudget;
const updateBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBudget = req.body;
        yield budgetData.updateBudget(Number(req.params.id), updatedBudget);
        res.json({ message: 'Budget updated' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating budget' });
    }
});
exports.updateBudget = updateBudget;
const deleteBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield budgetData.deleteBudget(Number(req.params.id));
        res.json({ message: 'Budget deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting budget' });
    }
});
exports.deleteBudget = deleteBudget;
