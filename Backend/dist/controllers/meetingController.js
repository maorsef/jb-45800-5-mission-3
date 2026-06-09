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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeetingsByGroup = getMeetingsByGroup;
exports.getMeetingById = getMeetingById;
exports.createMeeting = createMeeting;
exports.updateMeeting = updateMeeting;
exports.deleteMeeting = deleteMeeting;
const meetingService = __importStar(require("../services/meetingService"));
async function getMeetingsByGroup(req, res) {
    try {
        const groupId = Number(req.params.groupId);
        const meetings = await meetingService.getMeetingsByGroup(groupId);
        res.json(meetings);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch meetings";
        res.status(400).json({ error: message });
    }
}
async function getMeetingById(req, res) {
    try {
        const meeting = await meetingService.getMeetingById(Number(req.params.id));
        if (!meeting) {
            res.status(404).json({ error: "Meeting not found" });
            return;
        }
        res.json(meeting);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch meeting" });
    }
}
async function createMeeting(req, res) {
    try {
        const meeting = await meetingService.createMeeting(req.body);
        res.status(201).json(meeting);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Failed to create meeting";
        res.status(400).json({ error: message });
    }
}
async function updateMeeting(req, res) {
    try {
        const meeting = await meetingService.updateMeeting(Number(req.params.id), req.body);
        if (!meeting) {
            res.status(404).json({ error: "Meeting not found" });
            return;
        }
        res.json(meeting);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Failed to update meeting";
        res.status(400).json({ error: message });
    }
}
async function deleteMeeting(req, res) {
    try {
        const deleted = await meetingService.deleteMeeting(Number(req.params.id));
        if (!deleted) {
            res.status(404).json({ error: "Meeting not found" });
            return;
        }
        res.json({ message: "Meeting deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete meeting" });
    }
}
