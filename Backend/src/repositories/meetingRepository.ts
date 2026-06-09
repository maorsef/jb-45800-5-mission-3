import pool from "../config/database";
import { Meeting, CreateMeetingDTO } from "../models/Meeting";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export async function getMeetingsByGroup(groupId: number): Promise<Meeting[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM meetings WHERE group_id = ?", [groupId]
    );
    return rows as Meeting[];
}

export async function getMeetingById(id: number): Promise<Meeting | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM meetings WHERE meeting_id = ?", [id]
    );
    return rows.length > 0 ? rows[0] as Meeting : null;
}

export async function createMeeting(data: CreateMeetingDTO): Promise<Meeting> {
    const [result] = await pool.query<ResultSetHeader>(
        "INSERT INTO meetings (group_id, start_time, end_time, description, room) VALUES (?, ?, ?, ?, ?)",
        [data.group_id, data.start_time, data.end_time, data.description, data.room]
    );
    const meeting = await getMeetingById(result.insertId);
    return meeting!;
}

export async function updateMeeting(id: number, data: CreateMeetingDTO): Promise<Meeting | null> {
    await pool.query(
        "UPDATE meetings SET group_id=?, start_time=?, end_time=?, description=?, room=? WHERE meeting_id=?",
        [data.group_id, data.start_time, data.end_time, data.description, data.room, id]
    );
    return getMeetingById(id);
}

export async function deleteMeeting(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
        "DELETE FROM meetings WHERE meeting_id = ?", [id]
    );
    return result.affectedRows > 0;
}