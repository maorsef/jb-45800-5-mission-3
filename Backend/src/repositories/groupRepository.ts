import pool from "../config/database";
import { Group } from "../models/Group";
import { RowDataPacket } from "mysql2";

export async function getAllGroups(): Promise<Group[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM `groups`");
    return rows as Group[];
}