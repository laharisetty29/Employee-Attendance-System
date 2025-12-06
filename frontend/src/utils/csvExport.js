export function exportToCsv(filename, rows) {
  if (!rows || !rows.length) {
    alert("No data to export");
    return;
  }

  const keys = Object.keys(rows[0]);
  const escapeCell = (val) => {
    if (val === null || val === undefined) return "";
    return `"${String(val).replace(/"/g, '""')}"`;
  };

  const csv = [
    keys.join(","),
    ...rows.map(r => keys.map(k => escapeCell(r[k])).join(","))
  ].join("\r\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
