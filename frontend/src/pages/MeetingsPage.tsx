import React, { useEffect, useState } from "react";
import { getGroups, getMeetingsByGroup, deleteMeeting } from "../api/meetingsApi";
import { Group, Meeting } from "../types";
import { getApiErrorMessage } from "../utils/apiError";
import MeetingCard from "../components/MeetingCard";
import "./MeetingsPage.css";
import "./FormPage.css";

const MeetingsPage: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<number | "">("");
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [loadingGroups, setLoadingGroups] = useState(true);
    const [loadingMeetings, setLoadingMeetings] = useState(false);
    const [error, setError] = useState("");
    const [deleteTarget, setDeleteTarget] = useState<Meeting | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        setLoadingGroups(true);
        getGroups()
            .then(res => setGroups(res.data))
            .catch(err => setError(getApiErrorMessage(err)))
            .finally(() => setLoadingGroups(false));
    }, []);

    useEffect(() => {
        if (selectedGroup === "") {
            setMeetings([]);
            return;
        }

        setLoadingMeetings(true);
        setError("");
        getMeetingsByGroup(Number(selectedGroup))
            .then(res => setMeetings(res.data))
            .catch(err => setError(getApiErrorMessage(err)))
            .finally(() => setLoadingMeetings(false));
    }, [selectedGroup]);

    const handleDeleteRequest = (id: number) => {
        const meeting = meetings.find(m => m.meeting_id === id);
        if (meeting) setDeleteTarget(meeting);
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await deleteMeeting(deleteTarget.meeting_id);
            setMeetings(prev => prev.filter(m => m.meeting_id !== deleteTarget.meeting_id));
            setDeleteTarget(null);
        } catch (err) {
            setError(getApiErrorMessage(err));
            setDeleteTarget(null);
        } finally {
            setDeleting(false);
        }
    };

    const futureMeetings = meetings.filter(m => new Date(m.start_time) > new Date()).length;
    const pastMeetings   = meetings.filter(m => new Date(m.start_time) <= new Date()).length;

    return (
        <div className="meetings-page">
            <div className="meetings-header">
                <span className="page-eyebrow">ניהול פגישות</span>
                <h1>פגישות לפי <span>קבוצה</span></h1>
            </div>

            {error && <div className="form-error meetings-error">{error}</div>}

            <div className="filter-section">
                <div className="filter-label-group">
                    <label htmlFor="group-select">בחר קבוצת פיתוח</label>
                    <div className="select-wrapper">
                        <select
                            id="group-select"
                            value={selectedGroup}
                            onChange={e => setSelectedGroup(e.target.value === "" ? "" : Number(e.target.value))}
                            disabled={loadingGroups}
                        >
                            <option value="">בחר קבוצה...</option>
                            {groups.map(g => (
                                <option key={g.group_id} value={g.group_id}>
                                    {g.group_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {meetings.length > 0 && (
                    <div className="meetings-count">
                        {futureMeetings} עתידיות · {pastMeetings} שהסתיימו
                    </div>
                )}
            </div>

            {loadingGroups && (
                <div className="loading">
                    <div className="loading-spinner" />
                    <span>טוען קבוצות...</span>
                </div>
            )}

            {loadingMeetings && (
                <div className="loading">
                    <div className="loading-spinner" />
                    <span>טוען פגישות...</span>
                </div>
            )}

            {!loadingMeetings && !error && selectedGroup !== "" && meetings.length === 0 && (
                <div className="empty">
                    <div className="empty-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="4" width="18" height="18" rx="2"/>
                            <path d="M16 2v4M8 2v4M3 10h18"/>
                        </svg>
                    </div>
                    <p>אין פגישות לקבוצה זו</p>
                    <small>הוסף פגישה חדשה מהתפריט</small>
                </div>
            )}

            <div className="meetings-grid">
                {meetings.map(m => (
                    <MeetingCard
                        key={m.meeting_id}
                        meeting={m}
                        onDelete={handleDeleteRequest}
                    />
                ))}
            </div>

            {deleteTarget && (
                <div className="modal-overlay" onClick={() => !deleting && setDeleteTarget(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
                        <div className="modal-header">
                            <h2 className="modal-title" id="delete-modal-title">מחיקת פגישה</h2>
                            <button
                                className="modal-close"
                                onClick={() => setDeleteTarget(null)}
                                aria-label="סגור"
                                disabled={deleting}
                            >
                                ×
                            </button>
                        </div>
                        <p className="modal-body">
                            האם למחוק את הפגישה בחדר <strong>{deleteTarget.room}</strong>?
                            פעולה זו אינה ניתנת לביטול.
                        </p>
                        <div className="modal-actions">
                            <button
                                className="modal-btn modal-btn-cancel"
                                onClick={() => setDeleteTarget(null)}
                                disabled={deleting}
                            >
                                ביטול
                            </button>
                            <button
                                className="modal-btn modal-btn-danger"
                                onClick={confirmDelete}
                                disabled={deleting}
                            >
                                {deleting ? "מוחק..." : "מחק פגישה"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeetingsPage;
