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
exports.deleteSupply = exports.updateSupply = exports.createSupply = exports.getSupplyById = exports.getSupplies = void 0;
const supplyData = __importStar(require("../data/Supplies"));
const getSupplies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplies = yield supplyData.getSupplies();
        res.json(supplies);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching supplies' });
    }
});
exports.getSupplies = getSupplies;
const getSupplyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supply = yield supplyData.getSupplyById(Number(req.params.id));
        if (supply) {
            res.json(supply);
        }
        else {
            res.status(404).json({ error: 'Supply not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching supply' });
    }
});
exports.getSupplyById = getSupplyById;
const createSupply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSupply = req.body;
        yield supplyData.createSupply(newSupply);
        res.status(201).json({ message: 'Supply created' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating supply' });
    }
});
exports.createSupply = createSupply;
const updateSupply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedSupply = req.body;
        yield supplyData.updateSupply(Number(req.params.id), updatedSupply);
        res.json({ message: 'Supply updated' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating supply' });
    }
});
exports.updateSupply = updateSupply;
const deleteSupply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield supplyData.deleteSupply(Number(req.params.id));
        res.json({ message: 'Supply deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting supply' });
    }
});
exports.deleteSupply = deleteSupply;
