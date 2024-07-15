"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Member_1 = __importDefault(require("./routes/Member"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api", Member_1.default);
app.listen(8000, () => {
    console.log("**----------------------------------**");
    console.log("====      Server is On...!!!      ====");
    console.log("**----------------------------------**");
});
