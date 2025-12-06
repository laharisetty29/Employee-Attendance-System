import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../utils/api";
import { exportToCsv } from "../utils/csvExport";
import "../styles/Layout.css";
import "../styles/Reports.css";

export default function Reports() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedUser, setSelectedUser] = useState("all");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/auth/all-users");
        setEmployees(res.data);
      } catch (err) {
        console.warn("Could not load users", err?.message || err);
      }
    })();
  }, []);

  async function onSearch() {
    if (!start || !end) return alert("Select start and end dates");
    setLoading(true);
    try {
      const res = await api.get(`/attendance/reports?start=${start}&end=${end}&userId=${selectedUser}`);
      setRows(res.data.map(r => ({
        date: r.date,
        user: r.user?.name || r.user?.email || "Unknown",
        checkIn: r.checkIn || "",
        checkOut: r.checkOut || "",
        status: r.status,
        totalHours: r.totalHours || 0
      })));
    } catch (err) {
      console.error(err);
      alert("Could not load reports");
    } finally {
      setLoading(false);
    }
  }

  function onExport() {
    exportToCsv(`attendance-report-${start || "all"}-${end || "all"}.csv`, rows);
  }

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="page-content">
        <h2>Manager Reports</h2>

        <div className="reports-controls">
          <label>Start: <input type="date" value={start} onChange={e=>setStart(e.target.value)} /></label>
          <label>End: <input type="date" value={end} onChange={e=>setEnd(e.target.value)} /></label>

          <label>
            Employee:
            <select value={selectedUser} onChange={e=>setSelectedUser(e.target.value)}>
              <option value="all">All</option>
              {employees.map(u => <option key={u._id} value={u._id}>{u.name || u.email}</option>)}
            </select>
          </label>

          <button onClick={onSearch}>Search</button>
          <button onClick={onExport} disabled={!rows.length}>Export to CSV</button>
        </div>

        {loading ? <p>Loading...</p> : (
          <div className="reports-table">
            <table>
              <thead>
                <tr><th>Date</th><th>User</th><th>Check In</th><th>Check Out</th><th>Status</th><th>Total Hours</th></tr>
              </thead>
              <tbody>
                {rows.map((r,i)=>(
                  <tr key={i}>
                    <td>{r.date}</td><td>{r.user}</td><td>{r.checkIn}</td><td>{r.checkOut}</td><td>{r.status}</td><td>{r.totalHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
