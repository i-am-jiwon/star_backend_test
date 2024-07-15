import express from 'express';
import * as SupplyController from '../controller/SupplyController';
import * as BudgetController from '../controller/BudgetController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = express.Router();

// 비품 관련 라우트
router.get('/supplies', authenticateToken, SupplyController.getSupplies);
router.get('/supplies/:id', authenticateToken, SupplyController.getSupplyById);
router.post('/supplies', authenticateToken, authorizeRole(3), SupplyController.createSupply);
router.put('/supplies/:id', authenticateToken, authorizeRole(3), SupplyController.updateSupply);
router.delete('/supplies/:id', authenticateToken, authorizeRole(3), SupplyController.deleteSupply);

// 예산 관련 라우트
router.get('/budgets', authenticateToken, BudgetController.getBudgets);
router.get('/budgets/:id', authenticateToken, BudgetController.getBudgetById);
router.post('/budgets', authenticateToken, authorizeRole(3), BudgetController.createBudget);
router.put('/budgets/:id', authenticateToken, authorizeRole(3), BudgetController.updateBudget);
router.delete('/budgets/:id', authenticateToken, authorizeRole(3), BudgetController.deleteBudget);


export default router;
