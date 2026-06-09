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
const meetingRepo = __importStar(require("../repositories/meetingRepository"));
function validateMeetingFields(data) {
    if (!data.group_id || !data.start_time || !data.end_time || !data.description?.trim() || !data.room?.trim()) {
        throw new Error("All fields are required");
    }
}
async function getMeetingsByGroup(groupId) {
    if (!groupId || Number.isNaN(groupId)) {
        throw new Error("Invalid group id");
    }
    return meetingRepo.getMeetingsByGroup(groupId);
}
async function getMeetingById(id) {
    return meetingRepo.getMeetingById(id);
}
async function createMeeting(data) {
    validateMeetingFields(data);
    if (new Date(data.start_time) <= new Date()) {
        throw new Error("Start time must be in the future");
    }
    if (new Date(data.start_time) >= new Date(data.end_time)) {
        throw new Error("Start time must be before end time");
    }
    return meetingRepo.createMeeting(data);
}
async function updateMeeting(id, data) {
    validateMeetingFields(data);
    if (new Date(data.start_time) >= new Date(data.end_time)) {
        throw new Error("Start time must be before end time");
    }
    return meetingRepo.updateMeeting(id, data);
}
async function deleteMeeting(id) {
    return meetingRepo.deleteMeeting(id);
}
