import { Request, Response } from "express";
import * as meetingService from "../services/meetingService";

export async function getMeetingsByGroup(req: Request, res: Response): Promise<void> {
    try {
        const groupId = Number(req.params.groupId);
        const meetings = await meetingService.getMeetingsByGroup(groupId);
        res.json(meetings);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to fetch meetings";
        res.status(400).json({ error: message });
    }
}

export async function getMeetingById(req: Request, res: Response): Promise<void> {
    try {
        const meeting = await meetingService.getMeetingById(Number(req.params.id));
        if (!meeting) { res.status(404).json({ error: "Meeting not found" }); return; }
        res.json(meeting);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch meeting" });
    }
}

export async function createMeeting(req: Request, res: Response): Promise<void> {
    try {
        const meeting = await meetingService.createMeeting(req.body);
        res.status(201).json(meeting);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to create meeting";
        res.status(400).json({ error: message });
    }
}

export async function updateMeeting(req: Request, res: Response): Promise<void> {
    try {
        const meeting = await meetingService.updateMeeting(Number(req.params.id), req.body);
        if (!meeting) { res.status(404).json({ error: "Meeting not found" }); return; }
        res.json(meeting);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to update meeting";
        res.status(400).json({ error: message });
    }
}

export async function deleteMeeting(req: Request, res: Response): Promise<void> {
    try {
        const deleted = await meetingService.deleteMeeting(Number(req.params.id));
        if (!deleted) { res.status(404).json({ error: "Meeting not found" }); return; }
        res.json({ message: "Meeting deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete meeting" });
    }
}
