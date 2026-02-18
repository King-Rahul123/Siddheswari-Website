import { useState } from "react";

export default function Products() {
    const [search, setSearch] = useState("");
    const [showExport, setShowExport] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [company, setCompany] = useState("all");

    const products = [
        {
            id: "B001",
            name: "Paracetamol 500mg",
            company: "Cipla",
            batch: "CPM241",
            expiry: "12/2026",
            stock: 320,
            mrp: 22,
            ptr: 18,
            pts: 17,
        },
        {
            id: "B002",
            name: "Amlodipine 5mg",
            company: "Sun Pharma",
            batch: "SUN311",
            expiry: "06/2025",
            stock: 12,
            mrp: 85,
            ptr: 72,
            pts: null,
        },
    ];

    const companies = ["all", ...new Set(products.map(p => p.company))];

    const filteredProducts = products.filter(p =>
        (company === "all" || p.company === company) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    /* ================= EXPORT FUNCTIONS ================= */
    const exportCSV = () => {
        const header = [
            "Product",
            "Company",
            "Batch",
            "Expiry",
            "Stock",
            "MRP",
            "PTR",
            "PTS",
        ];

        const rows = filteredProducts.map((p) => [
            p.name,
            p.company,
            p.batch,
            p.expiry,
            p.stock,
            p.mrp,
            p.ptr,
            p.pts ?? "",
        ]);

        const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "products-stock.csv";
        a.click();
        setShowExport(false);
    };

    const exportExcel = () => {
        let table = `
            <table border="1">
            <tr>
                <th>Product</th>
                <th>Company</th>
                <th>Batch</th>
                <th>Expiry</th>
                <th>Stock</th>
                <th>MRP</th>
                <th>PTR</th>
                <th>PTS</th>
            </tr>
        `;

        filteredProducts.forEach((p) => {
            table += `
            <tr>
                <td>${p.name}</td>
                <td>${p.company}</td>
                <td>${p.batch}</td>
                <td>${p.expiry}</td>
                <td>${p.stock}</td>
                <td>${p.mrp}</td>
                <td>${p.ptr}</td>
                <td>${p.pts ?? ""}</td>
            </tr>
            `;
        });
        table += "</table>";

        const blob = new Blob([table], {
            type: "application/vnd.ms-excel",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "products-stock.xls";
        a.click();
        setShowExport(false);
    };

    const exportPDF = () => {
        const win = window.open("", "", "width=900,height=700");
        win.document.write(`
            <html>
                <head>
                    <title>Products Stock</title>
                    <style>
                        table { width: 100%; border-collapse: collapse; font-size: 12px; }
                        th, td { border: 1px solid #333; padding: 6px; text-align: center; }
                        th { background: #f1f5f9; }
                    </style>
                </head>
                <body>
                    <h2>Products Stock Report</h2>
                    <table>
                    <tr>
                        <th>Product</th>
                        <th>Company</th>
                        <th>Batch</th>
                        <th>Expiry</th>
                        <th>Stock</th>
                        <th>MRP</th>
                        <th>PTR</th>
                        <th>PTS</th>
                    </tr>
                    ${filteredProducts
                        .map(
                        (p) => `
                        <tr>
                            <td>${p.name}</td>
                            <td>${p.company}</td>
                            <td>${p.batch}</td>
                            <td>${p.expiry}</td>
                            <td>${p.stock}</td>
                            <td>${p.mrp}</td>
                            <td>${p.ptr}</td>
                            <td>${p.pts ?? ""}</td>
                        </tr>
                    `
                        )
                        .join("")}
                    </table>
                </body>
            </html>
        `);
        win.document.close();
        win.print();
        setShowExport(false);
    };

    // ================= FILE UPLOAD FUNCTIONS ====================
    const handleUpload = () => {
        if (!uploadFile) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const rows = text.split("\n").slice(1);

            const uploadedProducts = rows
            .map((row) => {
                const [ name, company, batch, expiry, stock, mrp, ptr, pts, ] = row.split(",");
                if (!name) return null;
                return {
                    id: Math.random().toString(36).slice(2),
                    name: name.trim(),
                    company: company?.trim(),
                    batch: batch?.trim(),
                    expiry: expiry?.trim(),
                    stock: Number(stock),
                    mrp: Number(mrp),
                    ptr: Number(ptr),
                    pts: pts ? Number(pts) : null,
                };
            })
            .filter(Boolean);

            // TEMP: log data (replace with API / state update)
            console.log("Uploaded Products:", uploadedProducts);

            alert(`${uploadedProducts.length} products uploaded successfully`);
            setShowUpload(false);
            setUploadFile(null);
        };
        reader.readAsText(uploadFile);
    };
    
    return (
        <div className="mt-6 mb-24 min-h-screen">
            <div className="bg-white border rounded-xl shadow-sm p-5 mb-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><i className="fas fa-boxes text-blue-600"></i>Products Stock</h2>
                        <p className="text-sm text-slate-500">PTR / PTS pricing • Batch & expiry tracking</p>
                    </div>

                    <div className="flex w-full md:w-auto gap-2 justify-end">
                        <button onClick={() => setShowUpload(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-50"><i className="fas fa-upload"></i>Upload</button>
                        <button  onClick={() => setShowExport(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"><i className="fas fa-file-export mr-2"></i>Export</button>
                    </div>
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
                    {showUpload && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-5">
                            <div className="bg-white rounded-xl shadow-lg w-96 p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-slate-800">Upload Products</h3>
                                    <button onClick={() => setShowUpload(false)} className="text-2xl leading-none">&times;</button>
                                </div>
                                {/* Upload Field */}
                                <label className="block mb-3 text-sm font-medium text-slate-600">Upload CSV / Excel File</label>
                                <input type="file" accept=".csv,.xls,.xlsx" onChange={(e) => setUploadFile(e.target.files[0])} className="w-full border rounded-lg p-2 mb-4" />
                                <div className="flex gap-3">
                                    <button onClick={handleUpload} disabled={!uploadFile} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                                    <i className="fas fa-cloud-upload-alt mr-2"></i>Upload</button>
                                    <button onClick={() => setShowUpload(false)} className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
                                </div>
                                <p className="text-xs text-slate-400 mt-3">Format: Product, Company, Batch, Expiry, Stock, MRP, PTR, PTS</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white border rounded-xl shadow-sm p-3 mb-4 flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative w-full">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"><i className="fas fa-search"></i></span>
                    <input type="text" placeholder="Search....." value={search} onChange={e => setSearch(e.target.value)} className="bg-gray-100 border-gray-400 form-control pl-8 pr-2 py-2 border-b border-l rounded-lg w-full" />
                </div>
                <select value={company} onChange={e => setCompany(e.target.value)} className="form-select md:w-64 bg-gray-100 rounded-lg p-2 border-b border-l border-gray-400">
                    {companies.map(c => (
                        <option key={c} value={c}>{c === "all" ? "All Companies" : c}</option>
                    ))}
                </select>
            </div>

            <div className="mb-2 text-sm mr-5 text-right">
                Showing <strong>{filteredProducts.length}</strong> items
            </div>

            {/* Table */}
            <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
                <table className="min-w-full table table-hover text-sm mb-0">
                    <thead className="bg-slate-100 text-slate-700">
                        <tr className="text-center text-sm md:text-base">
                            <th className="border py-3">Product</th>
                            <th className="border py-3">Company</th>
                            <th className="border py-3 hidden md:table-cell">Batch</th>
                            <th className="border py-3 hidden md:table-cell">Expiry</th>
                            <th className="border py-3">Stock</th>
                            <th className="border py-3">MRP</th>
                            <th className="border py-3 hidden md:table-cell">PTR</th>
                            <th className="border py-3 hidden md:table-cell">PTS</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="py-10 text-slate-400">No products found</td>
                            </tr>
                            ) : (
                            filteredProducts.map(p => (
                                <tr key={p.id} className="hover:bg-gray-50 text-xs md:text-base">
                                    <td className="border px-3 py-2">{p.name}</td>
                                    <td className="border px-3 py-2">{p.company}</td>
                                    <td className="border px-3 py-2 hidden md:table-cell">{p.batch}</td>
                                    <td className="border px-3 py-2 hidden md:table-cell">{p.expiry}</td>
                                    <td className={`border px-3 py-2 font-semibold ${ p.stock <= 20 ? "text-red-600": "text-emerald-600"}`}>{p.stock}</td>
                                    <td className="border px-3 py-2">₹{p.mrp}</td>
                                    <td className="border px-3 py-2 hidden md:table-cell font-semibold text-blue-700">₹{p.ptr}</td>
                                    <td className="border px-3 py-2 hidden md:table-cell font-semibold">{p.pts ? `₹${p.pts}` : "—"}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
