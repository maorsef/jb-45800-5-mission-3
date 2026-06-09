import React from "react";
import "./AboutPage.css";

const AboutPage: React.FC = () => {
    return (
        <div className="about-page">
            <div className="about-container">

                {/* Developer Photo */}
                <div className="about-image">
                    <img
                        src="/maor-sefti.png"
                        alt="Maor Sefti — Full Stack Developer"
                    />
                </div>

                {/* Content */}
                <div className="about-content">
                    <span className="about-badge">About The Developer</span>

                    <h1>DevMeetings Platform</h1>

                    <p>
                        פלטפורמה מודרנית לניהול פגישות קבוצות פיתוח,
                        עם ממשק מקצועי, מהיר ונגיש לכל חברי הצוות.
                    </p>

                    <div className="developer-card">
                        <h2>Maor Sefti</h2>
                        <p>
                            Full Stack Developer Student, בן 31 מבית שמש.
                            מתמחה בבניית מערכות Web מלאות עם דגש על עיצוב,
                            ביצועים וחוויית משתמש מקצועית.
                        </p>
                        <div className="tech-stack">
                            <span>TypeScript</span>
                            <span>React</span>
                            <span>Node.js</span>
                            <span>Express</span>
                            <span>MySQL</span>
                            <span>REST API</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutPage;