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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SupplyController = __importStar(require("../controller/SupplyController"));
const BudgetController = __importStar(require("../controller/BudgetController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// 비품 관련 라우트
router.get('/supplies', authMiddleware_1.authenticateToken, SupplyController.getSupplies);
router.get('/supplies/:id', authMiddleware_1.authenticateToken, SupplyController.getSupplyById);
router.post('/supplies', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(3), SupplyController.createSupply);
router.put('/supplies/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(3), SupplyController.updateSupply);
router.delete('/supplies/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(3), SupplyController.deleteSupply);
// 예산 관련 라우트
router.get('/budgets', authMiddleware_1.authenticateToken, BudgetController.getBudgets);
router.get('/budgets/:id', authMiddleware_1.authenticateToken, BudgetController.getBudgetById);
router.post('/budgets', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(3), BudgetController.createBudget);
router.put('/budgets/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(3), BudgetController.updateBudget);
router.delete('/budgets/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(3), BudgetController.deleteBudget);
exports.default = router;
