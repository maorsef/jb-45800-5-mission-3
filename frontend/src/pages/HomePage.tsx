import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <span className="hero-badge">
                        Meeting Management System
                    </span>

                    <h1>
                        ניהול פגישות
                        <span> חכם ומרכזי</span>
                    </h1>

                    <p>
                        פלטפורמה מקצועית לניהול פגישות קבוצות פיתוח.
                        תזמון, מעקב ותיאום — הכל במקום אחד, מעוצב לאנשים שמעריכים דיוק ואסתטיקה.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/meetings" className="primary-btn">
                            צפה בפגישות
                        </Link>
                        <Link to="/about" className="secondary-btn">
                            אודות המערכת
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-value">100%</span>
                            <span className="hero-stat-label">Real-Time</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">Multi</span>
                            <span className="hero-stat-label">Team Support</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">REST</span>
                            <span className="hero-stat-label">API Driven</span>
                        </div>
                    </div>
                </div>

                <div className="hero-image-wrapper">
                    <img
                        src="/meeting-team.jpg"
                        alt="Development Team Meeting"
                    />
                </div>
            </section>
        </div>
    );
};

export default HomePage;
