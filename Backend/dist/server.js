"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
dotenv_1.default.config();
const PORT = Number(process.env.PORT) || 4000;
async function startServer() {
    try {
        await (0, database_1.testConnection)();
        app_1.default.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error(err);
    }
}
startServer();
