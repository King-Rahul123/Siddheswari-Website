import { useState, useMemo } from "react";

const ATTENDANCE_DATA = [
  {
    id: "S101",
    name: "Rahul Das",
    attendance: { mon: true, tue: true, wed: false, thu: true, fri: true, sat: false },
  },
  {
    id: "S102",
    name: "Anita Roy",
    attendance: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true },
  },
  {
    id: "S103",
    name: "Sourav Sen",
    attendance: { mon: false, tue: false, wed: true, thu: true, fri: false, sat: false },
  },
];

export default function StaffAttendance() {
  const [search, setSearch] = useState("");
  const [showExport, setShowExport] = useState(false);

  /* ✅ FILTER */
  const filteredAttendance = useMemo(() => {
    return ATTENDANCE_DATA.filter((staff) =>
      staff.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  /* ✅ COUNT HELPERS */
  const countPresent = (attendance) =>
    Object.values(attendance).filter(Boolean).length;

  const countAbsent = (attendance) =>
    Object.values(attendance).filter((v) => !v).length;

  /* ================= EXPORT FUNCTIONS ================= */
  const exportCSV = () => {
    const header = ["Name", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Present", "Absent"];

    const rows = filteredAttendance.map((s) => [
      s.name,
      ...Object.values(s.attendance).map((v) => (v ? "Present" : "Absent")),
      countPresent(s.attendance),
      countAbsent(s.attendance),
    ]);

    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "staff-attendance.csv";
    a.click();

    setShowExport(false);
  };

  const exportExcel = () => {
    let table =
      "<table><tr><th>Name</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Present</th><th>Absent</th></tr>";

    filteredAttendance.forEach((s) => {
      table += `<tr>
        <td>${s.name}</td>
        ${Object.values(s.attendance).map((v) => `<td>${v ? "P" : "A"}</td>`).join("")}
        <td>${countPresent(s.attendance)}</td>
        <td>${countAbsent(s.attendance)}</td>
      </tr>`;
    });

    table += "</table>";

    const blob = new Blob([table], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "staff-attendance.xls";
    a.click();

    setShowExport(false);
  };

  const exportPDF = () => {
    const win = window.open("", "", "width=900,height=700");
    win.document.write("<h2>Staff Attendance</h2>");
    win.document.write(document.querySelector("table").outerHTML);
    win.document.close();
    win.print();
    setShowExport(false);
  };

    return (
        <div className="min-h-screen mt-10 mb-20 md:px-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800"><i className="bi bi-person-workspace"></i> Staff Attendance</h2>
                <p className="text-sm text-slate-500">Track staff presence and attendance summary</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Search */}
                    <div className="relative w-full md:max-w-3xl">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"><i className="fas fa-search"></i></span>
                        <input type="text" placeholder="Search staff..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-50 border-gray-300 form-control pl-8 pr-2 py-2 border-b border-l rounded-lg w-full" />
                    </div>

                    <div className="flex md:gap-5 gap-10">
                        {/* Filter by weekly, monthly and yearly */}
                        <select className="form-select bg-gray-50 border-gray-300 rounded-lg border-b border-l py-2 px-2 w-fit">
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                        {/* Export */}
                        <button  onClick={() => setShowExport(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"><i className="fas fa-file-export mr-2"></i>Export</button>
                        {showExport && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-5">
                            <div className="bg-white rounded-xl shadow-lg w-80 p-6">
                                <div className="flex justify-between">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Export Attendance</h3>
                                    <button aria-label="Close export modal" className="text-2xl leading-none -mt-5" onClick={() => setShowExport(false)}>&times;</button>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button onClick={exportPDF} className="w-full py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 font-medium"><i className="fas fa-file-pdf"></i> Export as PDF</button>
                                    <button onClick={exportExcel} className="w-full py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 font-medium"><i className="fas fa-file-excel"></i> Export as Excel</button>
                                    <button onClick={exportCSV} className="w-full py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium"><i className="fas fa-file-csv"></i> Export as CSV</button>
                                </div>
                                {/* <button onClick={() => setShowExport(false)} className="mt-4 w-full bg-gray-200 py-2 rounded-lg text-black hover:text-slate-700 text-sm">Cancel</button> */}
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
                <table className="table table-hover align-middle mb-0 w-full">
                    <thead className="bg-slate-100 text-slate-700 text-sm border-b">
                        <tr className="border-b border-dashed">
                            <th rowSpan="2" className="py-2 text-center border-r">Name</th>
                            <th colSpan="6" className="py-1 text-center">Attendance Status</th>
                            <th rowSpan="2" className="py-2 text-center border-l hidden md:table-cell">Present</th>
                            <th rowSpan="2" className="py-2 text-center border-l hidden md:table-cell">Absent</th>
                        </tr>
                        <tr>
                            <th className="text-center py-1">Mon</th>
                            <th className="text-center py-1">Tue</th>
                            <th className="text-center py-1">Wed</th>
                            <th className="text-center py-1">Thu</th>
                            <th className="text-center py-1">Fri</th>
                            <th className="text-center py-1 px-1 md:px-0">Sat</th>
                        </tr>
                    </thead>

                    <tbody className="text-center text-sm">
                        {filteredAttendance.length > 0 ? (filteredAttendance.map((staff) => (
                            <tr key={staff.id} className="border-b hover:bg-slate-50">
                                <td className="font-medium py-2 border-r">{staff.name}</td>
                                {Object.values(staff.attendance).map((day, i) => (
                                    <td key={i}>{day ? "✔" : "✖"}</td>
                                ))}

                                <td className="py-2 border-l border-black hidden md:table-cell font-semibold text-green-600">{countPresent(staff.attendance)}</td>
                                <td className="py-2 border-l border-black hidden md:table-cell font-semibold text-red-600">{countAbsent(staff.attendance)}</td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="9" className="py-10 text-slate-400">No attendance records found</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
