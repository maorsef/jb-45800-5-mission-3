import { Request, Response } from "express";
import * as groupService from "../services/groupService";

export async function getAllGroups(req: Request, res: Response): Promise<void> {
    try {
        const groups = await groupService.getAllGroups();
        res.json(groups);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch groups" });
    }
}