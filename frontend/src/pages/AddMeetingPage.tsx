import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroups, createMeeting } from "../api/meetingsApi";
import { Group } from "../types";
import { getApiErrorMessage } from "../utils/apiError";
import "./FormPage.css";

const AddMeetingPage: React.FC = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<Group[]>([]);
    const [error, setError] = useState("");
    const [loadingGroups, setLoadingGroups] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ group_id: "", start_time: "", end_time: "", description: "", room: "" });

    useEffect(() => {
        getGroups()
            .then(res => setGroups(res.data))
            .catch(err => setError(getApiErrorMessage(err)))
            .finally(() => setLoadingGroups(false));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const now = new Date();
        const start = new Date(form.start_time);
        const end = new Date(form.end_time);

        if (start <= now) {
            setError("זמן ההתחלה חייב להיות בעתיד");
            return;
        }
        if (start >= end) {
            setError("זמן ההתחלה חייב להיות לפני זמן הסיום");
            return;
        }

        setSubmitting(true);
        try {
            await createMeeting({
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
                <h1>הוספת פגישה חדשה</h1>
                {error && <div className="form-error">{error}</div>}
                {loadingGroups ? (
                    <div className="form-loading">טוען קבוצות פיתוח...</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label>קבוצת פיתוח
                            <div className="select-field-wrapper">
                                <select
                                    name="group_id"
                                    value={form.group_id}
                                    onChange={handleChange}
                                    required
                                    disabled={groups.length === 0}
                                >
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
                            <input type="text" name="room" value={form.room} onChange={handleChange} required placeholder="לדוגמה: Blue Room" />
                        </label>
                        <button type="submit" className="btn-submit" disabled={submitting || groups.length === 0}>
                            {submitting ? "שומר..." : "הוסף פגישה"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddMeetingPage;
