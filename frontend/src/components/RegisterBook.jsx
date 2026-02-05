import { useState } from "react";
import Popup from "./Popup";

export default function RegisterBook() {
    const [activeTab, setActiveTab] = useState("staff");
    const [openPopup, setOpenPopup] = useState(false);
    const [popupType, setPopupType] = useState("staff");
    
    const staffData = [];
    const shopData = [];

    // CSV Export Helper
    const exportToCSV = (data, filename) => {
        if (!data || data.length === 0) {
            if (activeTab === "staff") {
                alert("No Staff Found");
            } else if (activeTab === "shop") {
                alert("No Shop Found");
            }
            return;
        }
        const csv = [
            Object.keys(data[0]).join(","), // header
            ...data.map(row => Object.values(row).join(","))
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleDownload = () => {
        if (activeTab === "staff") {
            exportToCSV(staffData, "staff_details.csv");
        } else if (activeTab === "shop") {
            exportToCSV(shopData, "shop_details.csv");
        }
    };

    return (
        <div className="min-h-screen mt-10 mb-20 md:px-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><i className="fas fa-book text-blue-600"></i>Register Book</h2>
                        <p className="text-sm text-slate-500">Registered staff & shop information</p>
                    </div>
                    {/* Download Button */}
                    <button 
                        title={activeTab === "staff"? "Download staff details": "Download shop details"} 
                        onClick={handleDownload} 
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-medium">
                            <i className="fas fa-file-csv mr-2"></i>Download
                    </button>
                </div>
            </div>

            {/* Tabs + Content */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                    <div className="flex md:flex-wrap gap-2">
                        <button onClick={() => setActiveTab("staff")} className={`text-sm md:text-base px-3 md:px-4 py-2 rounded-lg font-medium transition ${ activeTab === "staff"? "bg-blue-600 text-white": "bg-gray-100 text-slate-600 hover:bg-gray-200"}`}><i className="fas fa-user"></i> Staff Details</button>
                        <button onClick={() => setActiveTab("shop")} className={`text-sm md:text-base px-3 md:px-4 py-2 rounded-lg font-medium transition ${ activeTab === "shop"? "bg-blue-600 text-white": "bg-gray-100 text-slate-600 hover:bg-gray-200"}`}><i className="bi bi-building"></i> Shop Details</button>
                    </div>
                    <button title="Add Staff" onClick={() => {setPopupType("staff");setOpenPopup(true);}} className={`flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap ${activeTab === "staff"? "block":"hidden"}`}><i className="fas fa-plus mr-2"></i>Add Staff</button>
                    <button title="Register Shop" onClick={() => {setPopupType("shop");setOpenPopup(true);}} className={`flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap ${activeTab === "shop"? "block":"hidden"}`}><i className="fas fa-plus mr-2"></i>Register</button>
                    <Popup open={openPopup} type={popupType} onClose={() => setOpenPopup(false)} />
                </div>

                {/* Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="relative w-full md:max-w-md">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><i className="fas fa-search"></i></span>
                        <input type="text" placeholder={`Search ${activeTab === "staff" ? "staff" : "shop"}...`} className="bg-gray-50 border-gray-300 form-control pl-8 pr-2 py-2 border-b border-l rounded-lg w-full"/>
                    </div>
                    <span className="text-sm text-slate- md:mr-5">Total {activeTab === "staff" ? "Staff" : "shop"}:{" "}<strong>0</strong></span>
                </div>

                {/* ================= STAFF TABLE ================= */}
                {activeTab === "staff" && (
                    <div className="overflow-x-auto rounded-lg border">
                        <table className="table table-hover align-middle mb-0 w-full text-sm">
                            <thead className="bg-slate-100 text-slate-700">
                                <tr className="text-center text-xs md:text-base">
                                    <th className="py-3 border-b border-gray-400 border-r">Action</th>
                                    <th className="py-3 border-b border-gray-400 border-r hidden md:table-cell">Staff Image</th>
                                    <th className="py-3 border-b border-gray-400 border-r">Full Name</th>
                                    <th className="py-3 border-b border-gray-400 border-r">Mobile</th>
                                    <th className="py-3 border-b border-gray-400 border-r">Aadhar No.</th>
                                    <th className="py-3 border-b border-gray-400">Department</th>
                                    <th className="py-3 border-b border-gray-400 border-l hidden md:table-cell">Address</th>
                                </tr>
                            </thead>

                            <tbody className="text-center text-slate-700">
                                <tr>
                                    <td colSpan="8" className="py-10 text-slate-400">No staff records found</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ================= shop TABLE ================= */}
                {activeTab === "shop" && (
                    <div className="overflow-x-auto rounded-lg border">
                        <table className="table table-hover align-middle mb-0 w-full text-sm">
                            <thead className="bg-slate-100 text-slate-700">
                                <tr className="text-center text-xs md:text-base">
                                    <th className="py-3 border-b border-r border-gray-400">Action</th>
                                    <th className="py-3 border-b border-r border-gray-400">User ID</th>
                                    <th className="py-3 border-b border-r border-gray-400">Shop Name</th>
                                    <th className="py-3 border-b border-r border-gray-400 hidden md:table-cell">Owner Name</th>
                                    <th className="py-3 border-b border-r border-gray-400">Mobile</th>
                                    <th className="py-3 border-b border-r border-gray-400 hidden md:table-cell">GSTIN</th>
                                    <th className="py-3 border-b border-gray-400">City</th>
                                    <th className="py-3 border-b border-l border-gray-400 hidden md:table-cell">Address</th>
                                </tr>
                            </thead>

                            <tbody className="text-center text-slate-700">
                                <tr>
                                    <td colSpan="8" className="py-10 text-slate-400">No shop records found</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
