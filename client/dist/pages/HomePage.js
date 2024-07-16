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
// /pages/MainPage.tsx
const react_1 = __importStar(require("react"));
const api_1 = require("../services/api");
const MainPage = () => {
    const [id, setId] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        setError('');
        try {
            const data = yield (0, api_1.login)(id, password);
            console.log('Login successful:', data);
            setError('로그인 성공');
        }
        catch (error) {
            if (error.response) {
                setError('로그인 실패: ' + error.response.data.message);
            }
            else {
                setError('로그인 실패: 서버와의 연결에 문제가 있습니다.');
            }
        }
        finally {
            setLoading(false);
        }
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Front"),
        react_1.default.createElement("p", null, "login test"),
        error && react_1.default.createElement("p", { style: { color: 'red' } }, error),
        react_1.default.createElement("div", null,
            react_1.default.createElement("input", { type: "text", placeholder: "Enter your ID", value: id, onChange: (e) => setId(e.target.value) }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: "password", placeholder: "Enter your Password", value: password, onChange: (e) => setPassword(e.target.value) }),
            react_1.default.createElement("button", { onClick: handleLogin, disabled: loading }, loading ? 'Logging in...' : 'Login'))));
};
exports.default = MainPage;
