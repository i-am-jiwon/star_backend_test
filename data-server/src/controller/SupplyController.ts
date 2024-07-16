import { Request, Response } from 'express';
import * as supplyData from '../data/Supplies';
import logger from '../config/logger';

export const getSupplies = async (req: Request, res: Response) => {
    try {
        const supplies = await supplyData.getSupplies();
        logger.info('Supplies fetched successfully');
        res.json(supplies);
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error('Error fetching supplies: ' + error.message);
        } else {
            logger.error('Unknown error fetching supplies');
        }
        res.status(500).json({ status: 500, error: 'Error fetching supplies' });
    }
};

export const getSupplyById = async (req: Request, res: Response) => {
    try {
        const supply = await supplyData.getSupplyById(Number(req.params.id));
        if (supply) {
            logger.info(`Supply with ID ${req.params.id} fetched successfully`);
            res.json(supply);
        } else {
            logger.warn(`Supply with ID ${req.params.id} not found`);
            res.status(404).json({ status: 404, error: 'Supply not found' });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error('Error fetching supply: ' + error.message);
        } else {
            logger.error('Unknown error fetching supply');
        }
        res.status(500).json({ status: 500, error: 'Error fetching supply' });
    }
};

export const createSupply = async (req: Request, res: Response) => {
    try {
        const newSupply = req.body;
        await supplyData.createSupply(newSupply);
        logger.info('New supply created successfully');
        res.status(201).json({ message: 'Supply created' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error('Error creating supply: ' + error.message);
        } else {
            logger.error('Unknown error creating supply');
        }
        res.status(500).json({ status: 500, error: 'Error creating supply' });
    }
};

export const updateSupply = async (req: Request, res: Response) => {
    try {
        const updatedSupply = req.body;
        await supplyData.updateSupply(Number(req.params.id), updatedSupply);
        logger.info(`Supply with ID ${req.params.id} updated successfully`);
        res.json({ message: 'Supply updated' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error('Error updating supply: ' + error.message);
        } else {
            logger.error('Unknown error updating supply');
        }
        res.status(500).json({ status: 500, error: 'Error updating supply' });
    }
};

export const deleteSupply = async (req: Request, res: Response) => {
    try {
        const supplyId = Number(req.params.id);
        const supply = await supplyData.getSupplyById(supplyId);

        if (!supply) {
            logger.warn(`Supply with ID ${supplyId} not found`);
            return res.status(404).json({ status: 404, error: `ID - ${supplyId} Supply not found` });
        }

        await supplyData.deleteSupply(supplyId);
        logger.info(`Supply with ID ${supplyId} deleted successfully`);
        res.json({ message: `${supplyId} Supply deleted` });
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error('Error deleting supply: ' + error.message);
        } else {
            logger.error('Unknown error deleting supply');
        }
        res.status(500).json({ status: 500, error: 'Error deleting supply' });
    }
};
