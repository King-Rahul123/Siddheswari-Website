import { useState, useMemo } from "react";

/* ✅ STATIC DATA (KEEP OUTSIDE COMPONENT) */
const MY_LEDGER_DATA = [
    { company: "ABC Traders", amount: 12000, dueDate: "2026-02-05" },
    { company: "XYZ Pharma", amount: 8000, dueDate: "2026-02-10" },
    { company: "MediLife", amount: 15000, dueDate: "2026-02-15" },
];

const PARTY_LEDGER_DATA = [
    {
        id: "U1023",
        shop: "HealthCare Store",
        phone: "9876543210",
        address: "Kolkata",
        remarks: "Due",
    },
    {
        id: "U1044",
        shop: "Wellness Hub",
        phone: "9123456780",
        address: "Howrah",
        remarks: "Paid",
    },
    {
        id: "U1045",
        shop: "Wellness Hubs",
        phone: "9123456760",
        address: "Howrah",
        remarks: "Overdue",
    },
];

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700";
    case "Overdue":
      return "bg-red-200 text-red-700";
    case "Due":
    default:
      return "bg-amber-100 text-amber-700";
  }
};

export default function Ledger() {
    /* ✅ STATES */
    const [activeTab, setActiveTab] = useState("my");
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");

    /* ✅ FILTER LOGIC (NO ESLINT ERROR) */
    const filteredMyLedger = useMemo(() => {
        return MY_LEDGER_DATA.filter((item) => {
            const matchSearch = item.company
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchDate = date ? item.dueDate === date : true;

            return matchSearch && matchDate;
        });
    }, [search, date]);

    /* ✅ PARTY LEDGER FILTER */
    const filteredPartyLedger = useMemo(() => {
        return PARTY_LEDGER_DATA.filter((item) => {
            const q = search.toLowerCase();
            return (
            item.shop.toLowerCase().includes(q) ||
            item.id.toLowerCase().includes(q) ||
            item.phone.includes(q) ||
            item.address.toLowerCase().includes(q) ||
            item.remarks.toLowerCase().includes(q)
            );
        });
    }, [search]);


    /* ✅ TOTAL AMOUNT */
    const totalAmount = useMemo(() => {
        return filteredMyLedger.reduce((sum, item) => sum + item.amount,0);
    }, [filteredMyLedger]);

    return (
        <div className="min-h-screen md:my-10 md:px-6 md:mb-0 mt-10 mb-20">
            <h2 className="md:text-3xl text-2xl font-bold text-center mb-6"><i className="fas fa-book text-yellow-500"></i> Ledger Book</h2>
            <div className="flex justify-center mb-6">
                <div className="inline-flex bg-slate-100 rounded-xl p-1 shadow-sm">
                    <button onClick={() => setActiveTab("my")} className={`md:px-6 px-2 py-2 rounded-lg font-medium ${ activeTab === "my"? "bg-blue-600 text-white": "text-slate-600"}`}><i className="fas fa-file"></i> My Ledger</button>
                    <button onClick={() => setActiveTab("party")} className={`md:px-6 px-2 py-2 rounded-lg font-medium ${ activeTab === "party"? "bg-blue-600 text-white": "text-slate-600"}`}><i className="fas fa-users"></i> Party Ledger</button>
                </div>
            </div>

            {/* ================= MY LEDGER ================= */}
            {activeTab === "my" && (
                <div className="bg-white rounded-2xl shadow-sm border p-6 w-full">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800">My Ledger</h3>
                            <p className="text-sm text-slate-500">Company-wise outstanding and due payments</p>
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-semibold"><i className="fas fa-sack-dollar"></i>Total Due: ₹{totalAmount.toLocaleString()}</div>

                        {/* Export */}
                        <button
                            // onClick={exportToCSV}
                            className="text-blue-600 bg-gray-100 py-2 px-3 hover:bg-blue-600 hover:text-white rounded-lg"><i className="fas fa-upload"></i> Export</button>
                    </div>

                    <div className="flex flex-col gap-3 mb-5 md:flex-row md:gap-10">
                        {/* Search */}
                        <div className="relative w-full md:w-auto">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"><i className="fas fa-search"></i></span>
                            <input type="text" placeholder="Search company...." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-50 border-gray-300 form-control pl-8 pr-2 py-1 border-b border-l rounded-lg" />
                        </div>

                        {/* Date */}
                        <input type="date" className="form-control w-full md:max-w-fit px-2 border-b border-r rounded-lg bg-gray-50 border-gray-300" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </div>

                    {/* TABLE (FULL WIDTH FIXED) */}
                    <div className="w-full overflow-x-auto rounded-xl border">
                        <table className="table table-hover align-middle mb-0 w-full">
                            <thead className="bg-gray-200 text-slate-700">
                                <tr className="border-b border-gray-400 text-sm md:text-base">
                                    <th className="md:px-5 px-2 py-3 text-center border-r border-gray-300">Company</th>
                                    <th className="md:px-2 px-2 py-3 text-center border-r border-gray-300">Amount</th>
                                    <th className="md:px-2 px-2 py-3 text-center">Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMyLedger.length > 0 ? (filteredMyLedger.map((item, index) => (
                                    <tr key={index} className="hover:bg-slate-50 border-b border-gray-200 text-xs md:text-base">
                                        <td className="md:px-5 px-2 py-3 font-medium text-slate-800 text-center border-r border-gray-300">{item.company}</td>
                                        <td className="md:px-0 px-2 py-3 text-center font-semibold text-rose-600">₹{item.amount.toLocaleString()}</td>
                                        <td className="md:px-0 px-2 py-3 text-center border-l border-gray-300">
                                            <span className="inline-flex items-center gap-1 px-1 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">{item.dueDate}</span>
                                        </td>
                                    </tr>
                                ))
                                ) : (
                                    <tr><td colSpan="3" className="text-center text-slate-500 py-8">No ledger records found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            )}


            {/* ================= PARTY LEDGER ================= */}
            {activeTab === "party" && (
                <div className="bg-white rounded-xl shadow-md p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800">Party Ledger List</h3>
                            <p className="text-sm text-slate-500">Shop-wise outstanding and due payments</p>
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-semibold"><i className="fas fa-sack-dollar"></i>Total Due: ₹{}</div>
                    </div>

                    {/* Search Field */}
                    <div className="relative mb-5 w-full">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"><i className="fas fa-search"></i></span>
                        <input type="text" placeholder="Search....." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-50 border-gray-300 form-control pl-8 pr-2 py-2 border-b border-l rounded-lg w-full" />
                    </div>

                    <div className="w-full overflow-x-auto rounded-xl border">
                        <table className="table table-hover align-middle mb-0 w-full">
                            <thead className="bg-gray-200 text-slate-700">
                                <tr className="border-b border-gray-400 text-sm md:text-base font-semibold text-center">
                                    <th className="py-3 md:px-0 px-2 border-r border-gray-300">User ID</th>
                                    <th className="py-3 md:px-0 px-2 border-r border-gray-300">Shop Name</th>
                                    <th className="py-3 md:px-0 px-2 border-r border-gray-300 hidden md:table-cell">Phone</th>
                                    <th className="py-3 md:px-0 px-2 border-r border-gray-300 hidden md:table-cell">Address</th>
                                    <th className="py-3 md:px-0 px-2">Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPartyLedger.length > 0 ? (filteredPartyLedger.map((p, index) => (
                                    <tr key={index} className="hover:bg-slate-50 border-b border-gray-200 text-xs md:text-base text-center">
                                        <td className="py-2 md:px-0 px-2 border-r border-gray-300">{p.id}</td>
                                        <td className="py-2 md:px-0 px-2 border-r border-gray-300">{p.shop}</td>
                                        <td className="py-2 md:px-0 px-2 border-r border-gray-300 hidden md:table-cell">{p.phone}</td>
                                        <td className="py-2 md:px-0 px-2 border-r border-gray-300 hidden md:table-cell">{p.address}</td>
                                        <td className="py-3 md:px-0 px-2 border-l border-gray-300">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(p.remarks)}`}>{p.remarks}</span>
                                        </td>
                                    </tr>
                                  ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-slate-500">No party ledger records found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
