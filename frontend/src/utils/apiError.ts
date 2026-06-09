import axios from "axios";

const SERVER_ERROR_MAP: Record<string, string> = {
    "All fields are required": "כל השדות הינם שדות חובה",
    "Invalid group id": "קוד קבוצה לא תקין",
    "Start time must be in the future": "זמן ההתחלה חייב להיות בעתיד",
    "Start time must be before end time": "זמן ההתחלה חייב להיות לפני זמן הסיום",
    "Meeting not found": "הפגישה לא נמצאה",
    "Failed to fetch groups": "שגיאה בטעינת קבוצות",
    "Failed to fetch meetings": "שגיאה בטעינת פגישות",
    "Failed to fetch meeting": "שגיאה בטעינת פגישה",
    "Failed to create meeting": "שגיאה ביצירת פגישה",
    "Failed to update meeting": "שגיאה בעדכון פגישה",
    "Failed to delete meeting": "שגיאה במחיקת פגישה",
    "Route not found": "הנתיב לא נמצא בשרת",
};

function translateServerError(message: string): string {
    return SERVER_ERROR_MAP[message] ?? message;
}

export function getApiErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        if (!error.response) {
            return "לא ניתן להתחבר לשרת. הפעל את ה-Backend: cd Backend && npm run dev";
        }
        const data = error.response.data as { error?: string };
        if (data?.error) return translateServerError(data.error);
        if (error.response.status === 404) {
            return "הנתיב לא נמצא בשרת. ודא שה-Backend פועל על פורט 4000.";
        }
        return `שגיאת שרת (${error.response.status})`;
    }
    if (error instanceof Error) return error.message;
    return "אירעה שגיאה לא צפויה";
}
