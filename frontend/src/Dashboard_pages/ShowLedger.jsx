import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";

// sample transactions now include `paid` and `percent` so UI can render paid/due/remaining
const SAMPLE_PARTY_TRANSACTIONS = [
    { id: 1, date: "2026-01-05", invoice: "#1001", amount: 5000, paid: 0, percent: 7 },
    { id: 2, date: "2026-01-20", invoice: "#1002", amount: 3000, paid: 3000, percent: 7 },
    { id: 3, date: "2026-02-02", invoice: "#1020", amount: 2500, paid: 500, percent: 5 },
];

export default function ShowLedger() {
    const { partyId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const shopState = location?.state?.shop;
    const shopName = typeof shopState === "string" ? shopState : shopState?.shop || shopState?.name || "";
    const shopaddress = location?.state?.shopAddress || shopState?.address || shopState?.addr || "";
    // const total = SAMPLE_PARTY_TRANSACTIONS.reduce((s, t) => s + t.amount, 0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const totalPages = Math.ceil(SAMPLE_PARTY_TRANSACTIONS.length / itemsPerPage) || 1;

    // compute a clamped page value for rendering without calling setState inside effects
    const effectivePage = Math.min(Math.max(currentPage, 1), totalPages);

    const paginatedTransactions = SAMPLE_PARTY_TRANSACTIONS.slice(
        (effectivePage - 1) * itemsPerPage,
        effectivePage * itemsPerPage
    );

    // Default mapping provided per user examples: 7% => 14 days, 8% => 7 days
    const percentMaxDays = {
        5: 30,
        6: 21,
        7: 14,
        8: 7,
        10: 5,
    };

    // totalOverdue will be computed after helper `calcDaysSince` is defined

    const calcDaysSince = (dateStr) => {
        if (!dateStr) return 0;
        const bill = new Date(dateStr);
        const today = new Date();
        const diff = today - bill; // ms
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    const totalOverdue = SAMPLE_PARTY_TRANSACTIONS.reduce((sum, t) => {
        const paid = Number(t.paid || 0);
        const amount = Number(t.amount || 0);
        const due = Math.max(0, amount - paid);

        const pct = Number(t.percent || 0);
        const maxDays = percentMaxDays[pct] ?? Infinity;
        const days = calcDaysSince(t.date);
        const overdue = days > maxDays;

        if (overdue && due > 0) {
            return sum + due;
        }

        return sum;
    }, 0);

    const amountClass = (t) => {
        const paid = Number(t.paid || 0);
        const amount = Number(t.amount || 0);
        const due = Math.max(0, amount - paid);
        // fully paid
        if (paid >= amount) return { paidClass: "text-green-600", dueClass: "text-gray-700", remClass: "text-gray-700" };

        // check age against percent mapping
        const pct = Number(t.percent || 0);
        const maxDays = percentMaxDays[pct] ?? Infinity;
        const days = calcDaysSince(t.date);
        const overdue = days > maxDays;

        return {
            paidClass: paid > 0 ? "text-green-600" : "text-gray-700",
            dueClass: overdue && due > 0 ? "text-red-600" : "text-gray-700",
            remClass: (!overdue && due > 0) ? "text-gray-900" : "text-gray-700",
            days,
            maxDays
        };
    };
    
    // CSV Export Helper
    const exportToCSV = (data, filename) => {
        if (!data || data.length === 0) {
            window.alert("No Data Found");
            return;
        }
        const escape = (v) => `"${String(v).replace(/"/g, '""')}"`;
        const csv = [
            Object.keys(data[0]).join(","),
            ...data.map((row) => Object.values(row).map(escape).join(",")),
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
        exportToCSV(SAMPLE_PARTY_TRANSACTIONS, "party_ledger.csv");
    };

    return (
        <div className="min-h-screen md:my-10 md:px-6 mt-10 mb-20">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{shopName ? `${shopName} (${partyId})` : `Party Ledger - ${partyId}`}</h2>
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate(-1)} className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200"><i className="fas fa-arrow-left mr-2"></i>Back</button>
                    <button title="Download Ledger in CSV" onClick={handleDownload} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"><i className="fas fa-file-csv mr-2"></i>Export</button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
                <div className="mb-4 flex justify-between items-center">
                    <p className="text-sm text-slate-600">Showing statement for <strong>{shopName || partyId}, {shopaddress ? shopaddress : ""}</strong></p>
                    <p className="text-sm text-slate-500 space-x-3">
                        <span><strong>Mode:</strong> {shopState?.mode || "Default"}</span>
                        <span>%</span>
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-100 text-left">
                            <tr className="text-center">
                                <th className="px-3 py-2">Date</th>
                                <th className="px-3 py-2">Invoice</th>
                                <th className="px-3 py-2">Amount(₹)</th>
                                {/* <th className="px-3 py-2">Due (₹)</th> */}
                                {/* <th className="px-3 py-2">Remaining (₹)</th> */}
                                {/* <th className="px-3 py-2">% / MaxDays</th> */}
                                <th className="px-3 py-2">Days</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedTransactions.map((t) => {
                                const classes = amountClass(t);
                                return (
                                    <tr key={t.id} className="border-b text-center">
                                        <td className="px-3 py-2">{t.date}</td>
                                        <td className="px-3 py-2">{t.invoice}</td>
                                        <td className={`px-3 py-2 font-semibold ${classes}`}>
                                            {(() => {
                                                const paid = Number(t.paid || 0);
                                                const amount = Number(t.amount || 0);
                                                const due = Math.max(0, amount - paid);

                                                const pct = Number(t.percent || 0);
                                                const maxDays = percentMaxDays[pct] ?? Infinity;
                                                const days = calcDaysSince(t.date);
                                                const overdue = days > maxDays;

                                                // 🟢 FULLY PAID
                                                if (paid >= amount && amount > 0) {
                                                    return ( <span className="text-green-600">₹{amount.toLocaleString()}</span> );
                                                }

                                                // 🔴 OVERDUE (partial or full)
                                                if (overdue && due > 0) {
                                                    if (paid > 0) {
                                                        // partial overdue
                                                        return (
                                                            <div className="flex flex-col items-center">
                                                                <span className="text-red-600">₹{due.toLocaleString()}</span>
                                                                <span className="text-xs text-gray-400 line-through">Total: ₹{amount.toLocaleString()}</span>
                                                            </div>
                                                        );
                                                    }
                                                    // fully overdue
                                                    return ( <span className="text-red-600">₹{amount.toLocaleString()}</span> );
                                                }

                                                // 🟠 ON DATE BUT PARTIALLY PAID
                                                if (!overdue && paid > 0 && due > 0) {
                                                    return (
                                                        <div className="flex flex-col items-center">
                                                            <span className="text-black">₹{due.toLocaleString()}</span>
                                                            <span className="text-xs text-gray-400 line-through">Total: ₹{amount.toLocaleString()}</span>
                                                        </div>
                                                    );
                                                }

                                                // ⚫ ON DATE & NOT PAID
                                                return ( <span className="text-gray-900">₹{amount.toLocaleString()}</span> );
                                            })()}
                                        </td>
                                        <td className="px-3 py-2">{classes.days ?? calcDaysSince(t.date)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="font-semibold">
                                <td colSpan="2" className="px-3 py-2 text-right">Due Balance:</td>
                                <td colSpan="2" className="px-3 py-2 text-center text-red-500">₹{totalOverdue.toLocaleString()}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                {/* Legend for colors */}
                <div className="mt-3 text-sm hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-600"></span>
                        <span className="text-gray-700 font-medium">Fully Paid</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-600"></span>
                        <span className="text-gray-700 font-medium">Overdue</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-gray-900"></span>
                        <span className="text-gray-700 font-medium">On Date</span>
                    </div>
                </div>

                {/* Pagination controls */}
                <div className="flex md:justify-end justify-between items-center mt-4 gap-3">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"><i className="fas fa-chevron-left"></i> Prev</button>
                    <span className="px-3 py-1 text-sm">Page {currentPage} of {totalPages}</span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next <i className="fas fa-chevron-right"></i></button>
                </div>
            </div>
        </div>
    );
}
