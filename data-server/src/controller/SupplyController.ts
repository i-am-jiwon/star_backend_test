import { Request, Response } from 'express';
import * as supplyData from '../data/Supplies';

export const getSupplies = async (req: Request, res: Response) => {
    try {
        const supplies = await supplyData.getSupplies();
        res.json(supplies);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching supplies' });
    }
};

export const getSupplyById = async (req: Request, res: Response) => {
    try {
        const supply = await supplyData.getSupplyById(Number(req.params.id));
        if (supply) {
            res.json(supply);
        } else {
            res.status(404).json({ error: 'Supply not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching supply' });
    }
};

export const createSupply = async (req: Request, res: Response) => {
    try {
        const newSupply = req.body;
        await supplyData.createSupply(newSupply);
        res.status(201).json({ message: 'Supply created' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating supply' });
    }
};

export const updateSupply = async (req: Request, res: Response) => {
    try {
        const updatedSupply = req.body;
        await supplyData.updateSupply(Number(req.params.id), updatedSupply);
        res.json({ message: 'Supply updated' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating supply' });
    }
};

export const deleteSupply = async (req: Request, res: Response) => {
    try {
        await supplyData.deleteSupply(Number(req.params.id));
        res.json({ message: 'Supply deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting supply' });
    }
};
