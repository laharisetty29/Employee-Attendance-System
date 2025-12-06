import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../utils/api";
import "../styles/Layout.css";
import "../styles/Calendar.css";

function getMonthDays(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default function CalendarHistory() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchMonth(); }, [year, month]);

  async function fetchMonth() {
    setLoading(true);
    const start = new Date(year, month, 1).toISOString().split("T")[0];
    const end = new Date(year, month + 1, 0).toISOString().split("T")[0];
    try {
      const res = await api.get(`/attendance/reports?start=${start}&end=${end}&userId=all`);
      const map = {};
      res.data.forEach(r => map[r.date] = r);
      setRecords(map);
    } catch (err) {
      console.error(err);
      alert("Could not fetch calendar data");
    } finally {
      setLoading(false);
    }
  }

  const days = getMonthDays(year, month);
  function nextMonth() { if (month === 11) { setMonth(0); setYear(y => y+1); } else setMonth(m => m+1); }
  function prevMonth() { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); }

  function onDateClick(d) {
    const key = d.toISOString().split("T")[0];
    const rec = records[key];
    if (!rec) return alert(`${key}\nNo record`);
    alert(`${key}\nCheck In: ${rec.checkIn || "-"}\nCheck Out: ${rec.checkOut || "-"}\nStatus: ${rec.status}\nTotal Hours: ${rec.totalHours || 0}`);
  }

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="page-content">
        <h2>Attendance Calendar</h2>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <button onClick={prevMonth}>◀</button>
          <strong>{new Date(year, month).toLocaleString('default', { month: 'long' })} {year}</strong>
          <button onClick={nextMonth}>▶</button>
        </div>

        {loading ? <p>Loading...</p> : (
          <div className="calendar-grid">
            {days.map(d => {
              const key = d.toISOString().split("T")[0];
              const rec = records[key];
              let cls = "day";
              if (rec) {
                if (rec.status === "present") cls += " present";
                else if (rec.status === "absent") cls += " absent";
                else if (rec.status === "late") cls += " late";
                else if (rec.status === "half-day") cls += " halfday";
              }
              return (
                <div key={key} className={cls} onClick={() => onDateClick(d)}>
                  <div className="date-num">{d.getDate()}</div>
                  <div className="date-label">{rec ? rec.status : ""}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
