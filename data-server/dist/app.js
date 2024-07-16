"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Data_1 = __importDefault(require("./routes/Data"));
const Data_2 = __importDefault(require("./routes/Data"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Enable CORS for all origins
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// 비품 및 예산 라우트 설정
app.use('/api/data', Data_1.default);
app.use('/api/data', Data_2.default);
app.listen(8001, () => {
    console.log("====      Data - Server is On...!!!      ====");
});
