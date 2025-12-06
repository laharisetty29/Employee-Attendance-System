import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../store/slices/attendanceSlice";
import "../styles/Layout.css";
import "../styles/Dashboard.css";

export default function Dashboard(){
  const dispatch = useDispatch();
  const { dashboard } = useSelector(s => s.attendance);

  useEffect(()=>{ dispatch(getDashboard()); }, [dispatch]);

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="page-content">
        <div className="dashboard-header">
          <h1>Welcome, {dashboard?.name || "User"}</h1>
          <p>Today status: <b>{dashboard?.todayStatus}</b></p>
        </div>

        <div className="status-row">
          <div className="status-card">
            <h3>Present</h3>
            <p>{dashboard?.present || 0}</p>
          </div>
          <div className="status-card">
            <h3>Absent</h3>
            <p>{dashboard?.absent || 0}</p>
          </div>
          <div className="status-card">
            <h3>Late</h3>
            <p>{dashboard?.late || 0}</p>
          </div>
        </div>

        <div className="recent-box">
          <h3>Recent</h3>
          {dashboard?.recent?.length ? dashboard.recent.map((r,i)=>(
            <p key={i}>{r.date} — {r.status}</p>
          )) : <p>No recent records</p>}
        </div>
      </div>
    </div>
  );
}
