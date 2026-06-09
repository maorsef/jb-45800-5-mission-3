import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { Group, Meeting } from "../types";

const API = axios.create({ baseURL: API_BASE_URL });

export const getGroups = () => API.get<Group[]>("/groups");
export const getMeetingsByGroup = (groupId: number) => API.get<Meeting[]>(`/meetings/group/${groupId}`);
export const getMeetingById = (id: number) => API.get<Meeting>(`/meetings/${id}`);
export const createMeeting = (data: Omit<Meeting, "meeting_id">) => API.post<Meeting>("/meetings", data);
export const updateMeeting = (id: number, data: Omit<Meeting, "meeting_id">) => API.put<Meeting>(`/meetings/${id}`, data);
export const deleteMeeting = (id: number) => API.delete(`/meetings/${id}`);
