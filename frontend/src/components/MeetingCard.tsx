import React from "react";
import { useNavigate } from "react-router-dom";
import { Meeting } from "../types";
import { getMeetingDuration, isFutureMeeting, formatDateTime } from "../utils/meetingHelpers";
import "./MeetingCard.css";

interface Props { meeting: Meeting; onDelete: (id: number) => void; }

const MeetingCard: React.FC<Props> = ({ meeting, onDelete }) => {
    const navigate = useNavigate();
    const future = isFutureMeeting(meeting.start_time);

    return (
        <div className={`meeting-card ${future ? "future" : "past"}`}>

            {/* Header */}
            <div className="card-header">
                <span className="room">
                    <svg className="room-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M8 1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"/>
                        <path d="M8 14.5v-4" strokeLinecap="round"/>
                        <path d="M5.5 14.5h5" strokeLinecap="round"/>
                    </svg>
                    {meeting.room}
                </span>
                <span className={`badge ${future ? "badge-future" : "badge-past"}`}>
                    {future ? "עתידית" : "הושלמה"}
                </span>
            </div>

            {/* Description */}
            <p className="description">{meeting.description}</p>

            {/* Time Block */}
            <div className="card-time">
                <div className="time-row">
                    <svg className="time-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="6" cy="6" r="4.5"/>
                        <path d="M6 3.5V6l2 1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="time-label">התחלה</span>
                    <span>{formatDateTime(meeting.start_time)}</span>
                </div>
                <div className="time-row">
                    <svg className="time-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="6" cy="6" r="4.5"/>
                        <path d="M6 3.5V6l2 1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="time-label">סיום</span>
                    <span>{formatDateTime(meeting.end_time)}</span>
                </div>
            </div>

            {/* Duration Badge */}
            <div className="duration">
                <svg className="duration-icon" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="5" cy="5" r="3.5"/>
                    <path d="M5 3v2l1.5 1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {getMeetingDuration(meeting.start_time, meeting.end_time)}
            </div>

            {/* Actions */}
            <div className="card-actions">
                <button
                    className="btn-edit"
                    onClick={() => navigate(`/edit-meeting/${meeting.meeting_id}`)}
                >
                    עדכון
                </button>
                <button
                    className="btn-delete"
                    onClick={() => onDelete(meeting.meeting_id)}
                >
                    מחיקה
                </button>
            </div>

        </div>
    );
};

export default MeetingCard;