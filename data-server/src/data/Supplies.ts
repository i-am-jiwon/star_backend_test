import { db } from "../config/database";
import { Supply } from "../models/Supply";

export const getSupplies = async (): Promise<Supply[]> => {
    const [rows] = await db.query('SELECT * FROM supplies');
    return rows as Supply[];
};

export const getSupplyById = async (id: number): Promise<Supply | null> => {
    const [rows] = await db.query('SELECT * FROM supplies WHERE id = ?', [id]);
    const supplies = rows as Supply[];
    return supplies[0] || null;
};

export const createSupply = async (supply: Supply): Promise<void> => {
    await db.query('INSERT INTO supplies (name, price) VALUES (?, ?)', [supply.name, supply.price]);
};

export const updateSupply = async (id: number, supply: Supply): Promise<void> => {
    await db.query('UPDATE supplies SET name = ?, price = ? WHERE id = ?', [supply.name, supply.price, id]);
};

export const deleteSupply = async (id: number): Promise<void> => {
    await db.query('DELETE FROM supplies WHERE id = ?', [id]);
};
