export interface Meeting {
    meeting_id: number;
    group_id: number;
    start_time: Date;
    end_time: Date;
    description: string;
    room: string;
}

export interface CreateMeetingDTO {
    group_id: number;
    start_time: string;
    end_time: string;
    description: string;
    room: string;
}