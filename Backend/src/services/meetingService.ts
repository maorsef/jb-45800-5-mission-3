import * as meetingRepo from "../repositories/meetingRepository";
import { Meeting, CreateMeetingDTO } from "../models/Meeting";

function validateMeetingFields(data: CreateMeetingDTO): void {
    if (!data.group_id || !data.start_time || !data.end_time || !data.description?.trim() || !data.room?.trim()) {
        throw new Error("All fields are required");
    }
}

export async function getMeetingsByGroup(groupId: number): Promise<Meeting[]> {
    if (!groupId || Number.isNaN(groupId)) {
        throw new Error("Invalid group id");
    }
    return meetingRepo.getMeetingsByGroup(groupId);
}

export async function getMeetingById(id: number): Promise<Meeting | null> {
    return meetingRepo.getMeetingById(id);
}

export async function createMeeting(data: CreateMeetingDTO): Promise<Meeting> {
    validateMeetingFields(data);
    if (new Date(data.start_time) <= new Date()) {
        throw new Error("Start time must be in the future");
    }
    if (new Date(data.start_time) >= new Date(data.end_time)) {
        throw new Error("Start time must be before end time");
    }
    return meetingRepo.createMeeting(data);
}

export async function updateMeeting(id: number, data: CreateMeetingDTO): Promise<Meeting | null> {
    validateMeetingFields(data);
    if (new Date(data.start_time) >= new Date(data.end_time)) {
        throw new Error("Start time must be before end time");
    }
    return meetingRepo.updateMeeting(id, data);
}

export async function deleteMeeting(id: number): Promise<boolean> {
    return meetingRepo.deleteMeeting(id);
}
