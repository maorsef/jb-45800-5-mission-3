import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MeetingsPage from "./pages/MeetingsPage";
import AddMeetingPage from "./pages/AddMeetingPage";
import EditMeetingPage from "./pages/EditMeetingPage";
import "./App.css";

const App: React.FC = () => (
    <BrowserRouter>
        <Navbar />
        <main>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/meetings" element={<MeetingsPage />} />
                <Route path="/add-meeting" element={<AddMeetingPage />} />
                <Route path="/edit-meeting/:id" element={<EditMeetingPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </main>
    </BrowserRouter>
);
export default App;
