import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Attendance</h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/mark-attendance">Mark Attendance</Link>
        <Link to="/history">My History</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/login">Logout</Link>
      </nav>
    </div>
  );
}
