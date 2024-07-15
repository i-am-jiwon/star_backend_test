import { db } from "../config/database";
import { Budget } from "../models/Budget";

export const getBudgets = async (): Promise<Budget[]> => {
    const [rows] = await db.query('SELECT * FROM budgets');
    return rows as Budget[];
};

export const getBudgetById = async (id: number): Promise<Budget | null> => {
    const [rows] = await db.query('SELECT * FROM budgets WHERE id = ?', [id]);
    const budgets = rows as Budget[];
    return budgets[0] || null;
};

export const createBudget = async (budget: Budget): Promise<void> => {
    await db.query('INSERT INTO budgets (name, amount) VALUES (?, ?)', [budget.name, budget.amount]);
};

export const updateBudget = async (id: number, budget: Budget): Promise<void> => {
    await db.query('UPDATE budgets SET name = ?, amount = ? WHERE id = ?', [budget.name, budget.amount, id]);
};

export const deleteBudget = async (id: number): Promise<void> => {
    await db.query('DELETE FROM budgets WHERE id = ?', [id]);
};
