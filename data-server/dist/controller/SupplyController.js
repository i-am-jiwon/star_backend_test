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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSupply = exports.updateSupply = exports.createSupply = exports.getSupplyById = exports.getSupplies = void 0;
const supplyData = __importStar(require("../data/Supplies"));
const logger_1 = __importDefault(require("../config/logger"));
const getSupplies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplies = yield supplyData.getSupplies();
        logger_1.default.info('Supplies fetched successfully');
        res.json(supplies);
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error('Error fetching supplies: ' + error.message);
        }
        else {
            logger_1.default.error('Unknown error fetching supplies');
        }
        res.status(500).json({ status: 500, error: 'Error fetching supplies' });
    }
});
exports.getSupplies = getSupplies;
const getSupplyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supply = yield supplyData.getSupplyById(Number(req.params.id));
        if (supply) {
            logger_1.default.info(`Supply with ID ${req.params.id} fetched successfully`);
            res.json(supply);
        }
        else {
            logger_1.default.warn(`Supply with ID ${req.params.id} not found`);
            res.status(404).json({ status: 404, error: 'Supply not found' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error('Error fetching supply: ' + error.message);
        }
        else {
            logger_1.default.error('Unknown error fetching supply');
        }
        res.status(500).json({ status: 500, error: 'Error fetching supply' });
    }
});
exports.getSupplyById = getSupplyById;
const createSupply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSupply = req.body;
        yield supplyData.createSupply(newSupply);
        logger_1.default.info('New supply created successfully');
        res.status(201).json({ message: 'Supply created' });
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error('Error creating supply: ' + error.message);
        }
        else {
            logger_1.default.error('Unknown error creating supply');
        }
        res.status(500).json({ status: 500, error: 'Error creating supply' });
    }
});
exports.createSupply = createSupply;
const updateSupply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedSupply = req.body;
        yield supplyData.updateSupply(Number(req.params.id), updatedSupply);
        logger_1.default.info(`Supply with ID ${req.params.id} updated successfully`);
        res.json({ message: 'Supply updated' });
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error('Error updating supply: ' + error.message);
        }
        else {
            logger_1.default.error('Unknown error updating supply');
        }
        res.status(500).json({ status: 500, error: 'Error updating supply' });
    }
});
exports.updateSupply = updateSupply;
const deleteSupply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplyId = Number(req.params.id);
        const supply = yield supplyData.getSupplyById(supplyId);
        if (!supply) {
            logger_1.default.warn(`Supply with ID ${supplyId} not found`);
            return res.status(404).json({ status: 404, error: `ID - ${supplyId} Supply not found` });
        }
        yield supplyData.deleteSupply(supplyId);
        logger_1.default.info(`Supply with ID ${supplyId} deleted successfully`);
        res.json({ message: `${supplyId} Supply deleted` });
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error('Error deleting supply: ' + error.message);
        }
        else {
            logger_1.default.error('Unknown error deleting supply');
        }
        res.status(500).json({ status: 500, error: 'Error deleting supply' });
    }
});
exports.deleteSupply = deleteSupply;
