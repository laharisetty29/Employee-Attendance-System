import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getMyHistory } from "../store/slices/attendanceSlice";
import "../styles/Layout.css";
import "../styles/History.css";

export default function MyHistory(){
  const dispatch = useDispatch();
  const { history } = useSelector(s => s.attendance);

  useEffect(()=>{ dispatch(getMyHistory()); }, [dispatch]);

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="page-content">
        <h2>My Attendance History</h2>
        <div className="table-box">
          <table>
            <thead>
              <tr><th>Date</th><th>Check In</th><th>Check Out</th><th>Status</th><th>Total Hours</th></tr>
            </thead>
            <tbody>
              {history.map((h,i)=>(
                <tr key={i}>
                  <td>{h.date}</td>
                  <td>{h.checkIn || "-"}</td>
                  <td>{h.checkOut || "-"}</td>
                  <td>{h.status}</td>
                  <td>{h.totalHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
