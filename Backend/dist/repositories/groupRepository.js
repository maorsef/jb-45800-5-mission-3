"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGroups = getAllGroups;
const database_1 = __importDefault(require("../config/database"));
async function getAllGroups() {
    const [rows] = await database_1.default.query("SELECT * FROM `groups`");
    return rows;
}
