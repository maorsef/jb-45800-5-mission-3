"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeetingsByGroup = getMeetingsByGroup;
exports.getMeetingById = getMeetingById;
exports.createMeeting = createMeeting;
exports.updateMeeting = updateMeeting;
exports.deleteMeeting = deleteMeeting;
const database_1 = __importDefault(require("../config/database"));
async function getMeetingsByGroup(groupId) {
    const [rows] = await database_1.default.query("SELECT * FROM meetings WHERE group_id = ?", [groupId]);
    return rows;
}
async function getMeetingById(id) {
    const [rows] = await database_1.default.query("SELECT * FROM meetings WHERE meeting_id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
}
async function createMeeting(data) {
    const [result] = await database_1.default.query("INSERT INTO meetings (group_id, start_time, end_time, description, room) VALUES (?, ?, ?, ?, ?)", [data.group_id, data.start_time, data.end_time, data.description, data.room]);
    const meeting = await getMeetingById(result.insertId);
    return meeting;
}
async function updateMeeting(id, data) {
    await database_1.default.query("UPDATE meetings SET group_id=?, start_time=?, end_time=?, description=?, room=? WHERE meeting_id=?", [data.group_id, data.start_time, data.end_time, data.description, data.room, id]);
    return getMeetingById(id);
}
async function deleteMeeting(id) {
    const [result] = await database_1.default.query("DELETE FROM meetings WHERE meeting_id = ?", [id]);
    return result.affectedRows > 0;
}
