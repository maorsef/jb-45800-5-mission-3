import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGroups, getMeetingById, updateMeeting } from "../api/meetingsApi";
import { Group } from "../types";
import { getApiErrorMessage } from "../utils/apiError";
import "./FormPage.css";

function toDatetimeLocalValue(iso: string): string {
    const date = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const EditMeetingPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [groups, setGroups] = useState<Group[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ group_id: "", start_time: "", end_time: "", description: "", room: "" });

    useEffect(() => {
        const meetingId = Number(id);
        Promise.all([getGroups(), getMeetingById(meetingId)])
            .then(([groupsRes, meetingRes]) => {
                setGroups(groupsRes.data);
                const m = meetingRes.data;
                setForm({
                    group_id: String(m.group_id),
                    start_time: toDatetimeLocalValue(m.start_time),
                    end_time: toDatetimeLocalValue(m.end_time),
                    description: m.description,
                    room: m.room,
                });
            })
            .catch(err => setError(getApiErrorMessage(err)))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const start = new Date(form.start_time);
        const end = new Date(form.end_time);

        if (start >= end) {
            setError("זמן ההתחלה חייב להיות לפני זמן הסיום");
            return;
        }

        setSubmitting(true);
        try {
            await updateMeeting(Number(id), {
                group_id: Number(form.group_id),
                start_time: form.start_time,
                end_time: form.end_time,
                description: form.description,
                room: form.room,
            });
            navigate("/meetings");
        } catch (err) {
            setError(getApiErrorMessage(err));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="form-page">
            <div className="form-card">
                <h1>עדכון פגישה</h1>
                {error && <div className="form-error">{error}</div>}
                {loading ? (
                    <div className="form-loading">טוען נתוני פגישה...</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label>קבוצת פיתוח
                            <div className="select-field-wrapper">
                                <select name="group_id" value={form.group_id} onChange={handleChange} required>
                                    <option value="">בחר קבוצה...</option>
                                    {groups.map(g => (
                                        <option key={g.group_id} value={g.group_id}>{g.group_name}</option>
                                    ))}
                                </select>
                            </div>
                        </label>
                        <label>זמן התחלה
                            <input type="datetime-local" name="start_time" value={form.start_time} onChange={handleChange} required />
                        </label>
                        <label>זמן סיום
                            <input type="datetime-local" name="end_time" value={form.end_time} onChange={handleChange} required />
                        </label>
                        <label>תיאור הפגישה
                            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} />
                        </label>
                        <label>חדר פגישה
                            <input type="text" name="room" value={form.room} onChange={handleChange} required />
                        </label>
                        <button type="submit" className="btn-submit" disabled={submitting}>
                            {submitting ? "שומר..." : "שמור שינויים"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditMeetingPage;
