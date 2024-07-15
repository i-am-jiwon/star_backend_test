import { Request, Response } from 'express';
import * as budgetData from "../data/Budgets";

export const getBudgets = async (req: Request, res: Response) => {
    try {
        const budgets = await budgetData.getBudgets();
        res.json(budgets);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching budgets' });
    }
};

export const getBudgetById = async (req: Request, res: Response) => {
    try {
        const budget = await budgetData.getBudgetById(Number(req.params.id));
        if (budget) {
            res.json(budget);
        } else {
            res.status(404).json({ error: 'Budget not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching budget' });
    }
};

export const createBudget = async (req: Request, res: Response) => {
    try {
        const newBudget = req.body;
        await budgetData.createBudget(newBudget);
        res.status(201).json({ message: 'Budget created' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating budget' });
    }
};

export const updateBudget = async (req: Request, res: Response) => {
    try {
        const updatedBudget = req.body;
        await budgetData.updateBudget(Number(req.params.id), updatedBudget);
        res.json({ message: 'Budget updated' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating budget' });
    }
};

export const deleteBudget = async (req: Request, res: Response) => {
    try {
        await budgetData.deleteBudget(Number(req.params.id));
        res.json({ message: 'Budget deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting budget' });
    }
};
