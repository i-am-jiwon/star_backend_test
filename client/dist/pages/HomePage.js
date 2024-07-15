"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /pages/MainPage.tsx
const react_1 = __importDefault(require("react"));
const MainPage = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Main Page"),
        react_1.default.createElement("p", null, "This is the main page of the application.")));
};
exports.default = MainPage;
