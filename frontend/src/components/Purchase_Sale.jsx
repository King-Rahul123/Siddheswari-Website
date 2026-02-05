import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const handleDownloadBill = (bill) => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Purchase Bill", 14, 15);

    doc.setFontSize(10);
    doc.text(`Company: ${bill.company}`, 14, 25);
    doc.text(`Bill No: ${bill.billNo}`, 14, 32);
    doc.text(`Date: ${bill.date || ""}`, 14, 39);

    autoTable(doc, {
        head: [["Product", "Qty", "Rate", "Amount"]],
        body: bill.items.map(i => {
            const amount = i.qty * i.rate;
            return [
                i.product,
                i.qty,
                Number(i.rate).toFixed(2),        // ✅ rate with paisa
                Number(amount).toFixed(2),        // ✅ amount with paisa
            ];
        }),
        startY: 45,
    });

    const total = bill.items.reduce(
        (sum, i) => sum + i.qty * i.rate,
        0
    );

    doc.text(
        `Total Amount: ${Number(total).toFixed(2)}`, // ✅ total with paisa
        14,
        doc.lastAutoTable.finalY + 10
    );

    doc.save(`Purchase_Bill_${bill.billNo}.pdf`);
};

/* FLAW PURCHASE DATA */
const purchaseBills = [
    {
        billNo: "P-101",
        company: "ABC Pharma",
        date: "2026-02-01",
        items: [
        { product: "Paracetamol", qty: 100, rate: 2 },
        { product: "Vitamin C", qty: 50, rate: 5 },
        ],
    },
    {
        billNo: "P-102",
        company: "ABC Pharma",
        date: "2026-02-05",
        items: [{ product: "Cough Syrup", qty: 30, rate: 40 }],
    },
    {
        billNo: "P-201",
        company: "XYZ Med",
        date: "2026-02-03",
        items: [{ product: "Zinc Tablet", qty: 80, rate: 3 }],
    },
];

/* FLAW SELL DATA */
const sellBills = {
    "S-301": [
        { product: "Paracetamol", qty: 10, rate: 4 },
        { product: "Vitamin C", qty: 5, rate: 8 },
    ],
};

export default function Purchase_Sale() {
    const [activeTab, setActiveTab] = useState("purchase");
    const [company, setCompany] = useState("");
    const [purchaseBillNo, setPurchaseBillNo] = useState("");
    const [expandedBill, setExpandedBill] = useState(null);
    const [sellBillNo, setSellBillNo] = useState("");

    /* PURCHASE LOGIC */
    const selectedBill = purchaseBills.find(
        (b) => b.billNo === purchaseBillNo
    );

    const companyBills = purchaseBills.filter(
        (b) => company && b.company === company
    );

    const billTotal = (items) =>
        items.reduce((sum, i) => sum + i.qty * i.rate, 0);

    return (
        <div className="min-h-screen md:my-10 md:px-6 md:mb-0 mt-10 mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 text-center"><i className="fas fa-box-open text-amber-700"></i> Purchase & Sales</h2>
            {/* Tabs */}
            <div className="flex gap-4 mb-6">
                {["purchase", "sell"].map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-lg font-medium capitalize ${ activeTab === tab ? "bg-blue-600 text-white" : "bg-white border"}`}>{tab} Details</button>
                ))}
            </div>

            {/* PURCHASE DETAILS */}
            {activeTab === "purchase" && (
                <div className="bg-white rounded-xl shadow p-5 space-y-6">
                    {/* Filters */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <select className="border rounded-lg px-4 py-2" onChange={(e) => { setCompany(e.target.value); setPurchaseBillNo(""); }}>
                            <option value="">Select Company</option>
                            {[...new Set(purchaseBills.map((b) => b.company))].map(
                                (c) => (
                                <option key={c}>{c}</option>
                                )
                            )}
                        </select>
                        <input placeholder="Enter Purchase Bill No" className="border rounded-lg px-4 py-2" onChange={(e) => { setPurchaseBillNo(e.target.value); setCompany(""); }}/>
                    </div>

                    {/* BILL NUMBER → SHOW PRODUCTS */}
                    {purchaseBillNo && selectedBill && (
                        <>
                            <h3 className="font-semibold">Bill: {selectedBill.billNo} | {selectedBill.company}</h3>
                            <ProductTable items={selectedBill.items} />
                            <Total total={billTotal(selectedBill.items)} />
                        </>
                    )}

                    {/* COMPANY → SHOW ALL BILLS OR PRODUCTS */}
                    {company && companyBills.length > 0 && !expandedBill && (
                        <table className="w-full border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2">Bill No</th>
                                    <th className="border p-2">Date</th>
                                    <th className="border p-2">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companyBills.map((b) => (
                                    <tr key={b.billNo} onClick={() => setExpandedBill(b)} className="text-center cursor-pointer hover:bg-blue-50 transition">
                                        <td className="border p-2 font-medium text-blue-700">{b.billNo}</td>
                                        <td className="border p-2">{b.date}</td>
                                        <td className="border p-2">₹{billTotal(b.items)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {expandedBill && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{expandedBill.company} | Bill: {expandedBill.billNo}</h3>
                                <div className="flex gap-5">
                                    <button onClick={() => handleDownloadBill(expandedBill)} className="text-sm px-3 py-1 rounded-lg border hover:bg-blue-500 hover:text-white"><i className="fas fa-download"></i> Download Bill</button>
                                    <button onClick={() => setExpandedBill(null)} className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-200"><i className="fas fa-arrow-left"></i> Back to Bills</button>
                                </div>
                            </div>
                            <ProductTable items={expandedBill.items} />
                            <Total total={billTotal(expandedBill.items)} />
                        </div>
                    )}
                </div>
            )}

            {/* SELL DETAILS */}
            {activeTab === "sell" && (
                <div className="bg-white rounded-xl shadow p-5">
                    <div className="flex gap-5">
                        <input placeholder="Search Shop Name ......" className="border rounded-lg px-4 py-2 mb-4 w-full md:w-1/2" />
                        <input placeholder="Enter Sell Bill No" className="border rounded-lg px-4 py-2 mb-4 w-full md:w-1/2" onChange={(e) => setSellBillNo(e.target.value)} />
                    </div>
                    {sellBills[sellBillNo] && (
                        <>
                            <ProductTable items={sellBills[sellBillNo]} />
                            <Total total={billTotal(sellBills[sellBillNo])} />
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

/* REUSABLE COMPONENTS */

function ProductTable({ items }) {
    return (
        <table className="w-full border">
            <thead className="bg-gray-100">
                <tr>
                    <th className="border p-2">Product</th>
                    <th className="border p-2">Qty</th>
                    <th className="border p-2">Rate</th>
                    <th className="border p-2">Amount</th>
                </tr>
            </thead>
            <tbody>
                {items.map((i, idx) => (
                    <tr key={idx} className="text-center">
                        <td className="border p-2">{i.product}</td>
                        <td className="border p-2">{i.qty}</td>
                        <td className="border p-2">₹{i.rate}</td>
                        <td className="border p-2">₹{i.qty * i.rate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function Total({ total }) {
    return (
        <div className="text-right font-semibold text-lg mt-3">Total: ₹{total}</div>
    );
}