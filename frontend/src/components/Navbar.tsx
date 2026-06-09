import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<"dark" | "light">(() => {
        const saved = localStorage.getItem("theme");
        return saved === "light" ? "light" : "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));

    const links = [
        { to: "/", label: "דף בית" },
        { to: "/meetings", label: "פגישות" },
        { to: "/about", label: "אודות" },
    ];

    const ThemeIcon = theme === "dark" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
        </svg>
    ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M21 14.5A8.5 8.5 0 1111.5 4a6.5 6.5 0 109.5 10.5z" strokeLinejoin="round" />
        </svg>
    );

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
                <div className="navbar-logo-frame">
                    <img
                        src="/logo512.png"
                        alt="Meeting Management System"
                        className="navbar-brand-logo"
                    />
                </div>
                <div className="navbar-brand-text">
                    <span className="navbar-brand-main">מערכת ניהול פגישות</span>
                    <span className="navbar-brand-sub">Meeting Management System</span>
                </div>
            </Link>

            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                {links.map(link => (
                    <li key={link.to}>
                        <Link
                            to={link.to}
                            className={location.pathname === link.to ? "active" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
                <li>
                    <Link
                        to="/add-meeting"
                        className={`nav-cta${location.pathname === "/add-meeting" ? " active" : ""}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        פגישה חדשה
                    </Link>
                </li>
                <li className="theme-toggle-li">
                    <button
                        className="theme-toggle theme-toggle-mobile"
                        onClick={toggleTheme}
                        aria-label={theme === "dark" ? "מעבר למצב בהיר" : "מעבר למצב כהה"}
                    >
                        {ThemeIcon}
                        <span>{theme === "dark" ? "מצב בהיר" : "מצב כהה"}</span>
                    </button>
                </li>
            </ul>

            <div className="navbar-actions">
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={theme === "dark" ? "מעבר למצב בהיר" : "מעבר למצב כהה"}
                    title={theme === "dark" ? "מצב בהיר" : "מצב כהה"}
                >
                    {ThemeIcon}
                </button>

                <button
                    className="burger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="פתח תפריט"
                    aria-expanded={menuOpen}
                >
                    <span className="burger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
