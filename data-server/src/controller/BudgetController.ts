import { Request, Response } from 'express';
import * as budgetData from "../data/Budgets";
import logger from '../config/logger'; // 로거 임포트

export const getBudgets = async (req: Request, res: Response) => {
    try {
        const budgets = await budgetData.getBudgets();
        logger.info('Budgets fetched successfully');
        res.json(budgets);
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error('Error fetching budgets: ' + error.message);
        } else {
            logger.error('Unknown error fetching budgets');
        }
        res.status(500).json({ error: 'Error fetching budgets' });
    }
};

export const getBudgetById = async (req: Request, res: Response) => {
    try {
        const budget = await budgetData.getBudgetById(Number(req.params.id));
        if (budget) {
            logger.info(`Budget with ID ${req.params.id} fetched successfully`);
            res.json(budget);
        } else {
            logger.warn(`Budget with ID ${req.params.id} not found`);
            res.status(404).json({ error: 'Budget not found' });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error('Error fetching budget: ' + error.message);
        } else {
            logger.error('Unknown error fetching budget');
        }
        res.status(500).json({ error: 'Error fetching budget' });
    }
};

export const createBudget = async (req: Request, res: Response) => {
    try {
        const newBudget = req.body;
        await budgetData.createBudget(newBudget);
        logger.info('New budget created successfully');
        res.status(201).json({ message: 'Budget created' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error('Error creating budget: ' + error.message);
        } else {
            logger.error('Unknown error creating budget');
        }
        res.status(500).json({ error: 'Error creating budget' });
    }
};

export const updateBudget = async (req: Request, res: Response) => {
    try {
        const updatedBudget = req.body;
        await budgetData.updateBudget(Number(req.params.id), updatedBudget);
        logger.info(`Budget with ID ${req.params.id} updated successfully`);
        res.json({ message: 'Budget updated' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error('Error updating budget: ' + error.message);
        } else {
            logger.error('Unknown error updating budget');
        }
        res.status(500).json({ error: 'Error updating budget' });
    }
};

export const deleteBudget = async (req: Request, res: Response) => {
    try {
        const budgetId = Number(req.params.id);
        const budget = await budgetData.getBudgetById(budgetId);

        if (!budget) {
            logger.warn(`Budget with ID ${budgetId} not found for deletion`);
            return res.status(404).json({ error: 'Budget not found' });
        }

        await budgetData.deleteBudget(budgetId);
        logger.info(`Budget with ID ${budgetId} deleted successfully`);
        res.json({ message: 'Budget deleted' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error('Error deleting budget: ' + error.message);
        } else {
            logger.error('Unknown error deleting budget');
        }
        res.status(500).json({ error: 'Error deleting budget' });
    }
};