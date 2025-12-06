import React from "react";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { checkIn, checkOut, getDashboard } from "../store/slices/attendanceSlice";
import "../styles/Layout.css";
import "../styles/MarkAttendance.css";

export default function MarkAttendance(){
  const dispatch = useDispatch();

  const onCheckIn = async () => {
    try {
      await dispatch(checkIn()).unwrap();
      await dispatch(getDashboard());
      alert("Checked in");
    } catch (err) { alert(err?.message || "Check-in failed"); }
  };

  const onCheckOut = async () => {
    try {
      await dispatch(checkOut()).unwrap();
      await dispatch(getDashboard());
      alert("Checked out");
    } catch (err) { alert(err?.message || "Check-out failed"); }
  };

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="page-content">
        <div className="attendance-box">
          <h2>Mark Attendance</h2>
          <div className="attendance-buttons">
            <button onClick={onCheckIn}>Check In</button>
            <button onClick={onCheckOut}>Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
