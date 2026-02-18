import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";

// Generate company data outside component to avoid impure function calls during render
const generateCompanySales = () => {
    const seededRandom = (seed) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };
    
    return Array.from({ length: 50 }, (_, i) => ({
        name: `Pharma Company ${i + 1}`,
        revenue: Math.floor(seededRandom(i * 4 + 1) * 500000) + 50000,
        sales: Math.floor(seededRandom(i * 4 + 2) * 200000) + 50000,
        activeStock: Math.floor(seededRandom(i * 4 + 3) * 100000) + 20000,
        lowStock: Math.floor(seededRandom(i * 4 + 4) * 20000) + 5000,
        returns: Math.floor(seededRandom(i * 4 + 5) * 10000) + 1000,
    }));
};

const companySalesData = generateCompanySales();

// Format currency with K (thousands), L (lakhs), and Cr (crores)
const formatCurrency = (value) => {
    if (value >= 10000000) {
        return `₹${(value / 10000000).toFixed(1)}Cr`;
    } else if (value >= 100000) {
        return `₹${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) {
        return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `₹${value}`;
};

export default function Analytics() {

    // ================= MOCK DATA =================

    // Revenue data for different time periods
    const revenueDataByPeriod = useMemo(() => ({
        weekly: [
            { period: "Mon", revenue: 18000 },
            { period: "Tue", revenue: 22000 },
            { period: "Wed", revenue: 25000 },
            { period: "Thu", revenue: 20000 },
            { period: "Fri", revenue: 28000 },
            { period: "Sat", revenue: 35000 },
            { period: "Sun", revenue: 15000 },
        ],
        monthly: [
            { period: "Jan", revenue: 120000 },
            { period: "Feb", revenue: 150000 },
            { period: "Mar", revenue: 180000 },
            { period: "Apr", revenue: 160000 },
            { period: "May", revenue: 210000 },
            { period: "Jun", revenue: 240000 },
            { period: "Jul", revenue: 220000 },
            { period: "Aug", revenue: 260000 },
            { period: "Sep", revenue: 230000 },
            { period: "Oct", revenue: 280000 },
            { period: "Nov", revenue: 310000 },
            { period: "Dec", revenue: 350000 },
        ],
        "yearly": [
            { period: "2016", revenue: 800000 },
            { period: "2017", revenue: 950000 },
            { period: "2018", revenue: 1100000 },
            { period: "2019", revenue: 1350000 },
            { period: "2020", revenue: 1200000 },
            { period: "2021", revenue: 1800000 },
            { period: "2022", revenue: 2200000 },
            { period: "2023", revenue: 2800000 },
            { period: "2024", revenue: 3200000 },
            { period: "2025", revenue: 3800000 },
        ],
    }), []);

    const [revenuePeriod, setRevenuePeriod] = useState("monthly");
    const revenueData = revenueDataByPeriod[revenuePeriod];

    // Use pre-generated company data
    const companySales = companySalesData;

    // Calculate totals for "All Companies"
    const totalOperationalData = useMemo(() => {
        const totals = companySales.reduce (
            (acc, company) => ({
                sales: acc.sales + company.sales,
                activeStock: acc.activeStock + company.activeStock,
                lowStock: acc.lowStock + company.lowStock,
                returns: acc.returns + company.returns,
            }),
            { sales: 0, activeStock: 0, lowStock: 0, returns: 0 }
        );
        return [
            { name: "Total Sales", value: totals.sales },
            { name: "Active Stock", value: totals.activeStock },
            { name: "Low Stock", value: totals.lowStock },
            { name: "Returns / Damaged", value: totals.returns },
        ];
    }, [companySales]);

    // Get operational data for a specific company
    const getCompanyOperationalData = (companyName) => {
        if (companyName === "All Companies") {
            return totalOperationalData;
        }
        const company = companySales.find((c) => c.name === companyName);
        if (company) {
            return [
                { name: "Total Sales", value: company.sales },
                { name: "Active Stock", value: company.activeStock },
                { name: "Low Stock", value: company.lowStock },
                { name: "Returns / Damaged", value: company.returns },
            ];
        }
        return totalOperationalData;
    };

    const companyOptions = ["All Companies", ...companySales.map((c) => c.name)];

    const REPORT_COLORS = [
        "#16a34a", // Sales
        "#2563eb", // Active Stock
        "#f59e0b", // Low Stock
        "#dc2626", // Damaged
    ];

    const topShops = [
        { name: "HealthCare Store", revenue: 95000 },
        { name: "Wellness Hub", revenue: 82000 },
        { name: "MediLife Pharmacy", revenue: 72000 },
    ];

    const paymentAging = [
        { label: "0-30 Days", value: 120000 },
        { label: "31-60 Days", value: 80000 },
        { label: "60+ Days", value: 45000 },
    ];

    const stockAlerts = [
        { product: "Insulin", stock: 5 },
        { product: "Cough Syrup", stock: 8 },
        { product: "Antibiotic Injection", stock: 3 },
    ];

    // ================= KPI =================

    const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);

    // ================= FIRM FINANCIAL REPORT =================

    const firmFinancialData = useMemo(() => [
        { name: "Profit", value: 780000 },
        { name: "Expense", value: 420000 },
        { name: "Donation", value: 50000 },
        { name: "Other Income", value: 120000 },
    ], []);

    const netBalance = useMemo(() => {
        const profit = firmFinancialData.find(i => i.name === "Profit")?.value || 0;
        const expense = firmFinancialData.find(i => i.name === "Expense")?.value || 0;
        const donation = firmFinancialData.find(i => i.name === "Donation")?.value || 0;
        const other = firmFinancialData.find(i => i.name === "Other Income")?.value || 0;

        return profit + other - expense - donation;
    }, [firmFinancialData]);

    const FIRM_COLORS = [
        "#16a34a", // Profit - Green
        "#dc2626", // Expense - Red
        "#f59e0b", // Donation - Amber
        "#2563eb", // Other Income - Blue
    ];

    // ================= COMPANY STATES =================

    const [selectedCompany, setSelectedCompany] = useState("All Companies");
    const [reportCompanySearch, setReportCompanySearch] = useState("");
    const [isReportDropdownOpen, setIsReportDropdownOpen] = useState(false);
    const [companySearch, setCompanySearch] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");

    // Filtered company options for operational report dropdown
    const filteredCompanyOptions = companyOptions.filter((company) =>
        company.toLowerCase().includes(reportCompanySearch.toLowerCase())
    );

    // Get operational data based on selected company
    const companyReportData = getCompanyOperationalData(selectedCompany);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredCompanies = useMemo(() => {
        let data = companySales.filter((company) => company.name.toLowerCase().includes(companySearch.toLowerCase()) );

        data.sort((a, b) =>
        sortOrder === "desc"
            ? b.revenue - a.revenue
            : a.revenue - b.revenue
        );

        return data;
    }, [companySales, companySearch, sortOrder]);

    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

    const paginatedCompanies = filteredCompanies.slice (
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const top10Companies = [...filteredCompanies] .sort((a, b) => b.revenue - a.revenue) .slice(0, 10);

    return (
        <div className="min-h-screen mt-10 mb-20 md:px-6">

            {/* HEADER */}
            <div className="mb-8">
                <h2 className="md:text-3xl text-2xl font-bold text-slate-800 flex items-center gap-3"><i className="fas fa-chart-line text-blue-600"></i>Reports & Analytics</h2>
                <p className="text-slate-500 md:text-sm text-xs md:ml-12 ml-10">Advanced analytics for medical distribution management</p>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center">

                {/* Total Revenue */}
                <div className="relative bg-white p-6 rounded-xl shadow border overflow-hidden hover:shadow-lg transition">
                    <i className="fas fa-coins absolute -right-3 -bottom-3 text-7xl text-yellow-400 opacity-20"></i>
                    <p className="text-sm text-slate-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold text-emerald-600 mt-2">{formatCurrency(totalRevenue)}</h3>
                </div>

                {/* Total Companies */}
                <div className="relative bg-white p-6 rounded-xl shadow border overflow-hidden hover:shadow-lg transition">
                    <i className="fas fa-building absolute -right-2 -bottom-2 text-7xl text-blue-500 opacity-15"></i>
                    <p className="text-sm text-slate-500">Total Companies</p>
                    <h3 className="text-2xl font-bold text-blue-600 mt-2">{companySales.length}</h3>
                </div>

                {/* Outstanding Payments */}
                <div className="relative bg-white p-6 rounded-xl shadow border overflow-hidden hover:shadow-lg transition">
                    <i className="fas fa-credit-card absolute -right-2 -bottom-3 text-7xl text-amber-500 opacity-16"></i>
                    <p className="text-sm text-slate-500">Outstanding Payments</p>
                    <h3 className="text-2xl font-bold text-amber-600 mt-2">{formatCurrency(245000)}</h3>
                </div>

                {/* Low Stock Alerts */}
                <div onClick={() => { 
                        document .getElementById("low-stock-section") ?.scrollIntoView({ behavior: "smooth" }); 
                    }} 
                    className="relative bg-white p-6 rounded-xl shadow border overflow-hidden hover:shadow-lg hover:scale-[1.02] transition cursor-pointer"
                >
                    <i className="fas fa-exclamation-triangle absolute -right-1 -bottom-1 text-7xl text-red-500 opacity-10"></i>
                    <p className="text-sm text-slate-500">Low Stock Alerts</p>
                    <h3 className="text-2xl font-bold text-red-600 mt-2">{stockAlerts.length}</h3>
                </div>
            </div>

            {/* REVENUE + PIE GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

                {/* Revenue Growth */}
                <div className="bg-white p-6 rounded-xl shadow border">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                        <h3 className="text-lg font-semibold">Revenue Growth Trend</h3>
                        <select value={revenuePeriod} onChange={(e) => setRevenuePeriod(e.target.value)} className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Last 10 Years</option>
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 250 : 300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="period" interval={0} tick={{ fontSize: 10 }} angle={window.innerWidth < 640 ? -30 : 0} textAnchor={window.innerWidth < 640 ? "end" : "middle"} height={60} />
                            <YAxis hide={window.innerWidth < 640} tickFormatter={(value) => formatCurrency(value)} />
                            <Tooltip formatter={(value) => formatCurrency(value)} />
                            <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Operational Pie */}
                <div className="bg-white p-6 rounded-xl shadow border">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                        <h3 className="text-lg font-semibold">Company Wise Report</h3>
                        <div className="relative">
                            <input type="text" placeholder="Search company..." value={reportCompanySearch} onChange={(e) => {
                                    setReportCompanySearch(e.target.value);
                                    setIsReportDropdownOpen(true);
                                }}
                                onFocus={() => setIsReportDropdownOpen(true)}
                                className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                            />
                            {isReportDropdownOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                    {filteredCompanyOptions.length > 0 ? (
                                        filteredCompanyOptions.map((company) => (
                                            <div key={company} onClick={() => {
                                                    setSelectedCompany(company);
                                                    setReportCompanySearch(company);
                                                    setIsReportDropdownOpen(false);
                                                }}
                                                className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${selectedCompany === company ? "bg-blue-100 font-semibold" : ""}`}
                                            >{company}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-3 py-2 text-sm text-gray-400">No companies found</div>
                                    )}
                                </div>
                            )}
                            {isReportDropdownOpen && (
                                <div className="fixed inset-0 z-0" onClick={() => setIsReportDropdownOpen(false)}/>
                            )}
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 310 : 350}>
                        <PieChart>
                            <Pie data={companyReportData} dataKey="value" nameKey="name" outerRadius={100} label={({ value }) => formatCurrency(value)}>
                                {companyReportData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={REPORT_COLORS[index % REPORT_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => formatCurrency(value)} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ================= FIRM FINANCIAL REPORT ================= */}
            <div className="bg-white p-6 rounded-xl shadow border mb-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2"><i className="fas fa-building text-purple-600"></i>Firm Financial Report</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                    {/* Pie Chart */}
                    <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 350 : 400}>
                        <PieChart>
                            <Pie data={firmFinancialData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={120} label={({ value }) => `₹${value.toLocaleString()}`}>
                                {firmFinancialData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={FIRM_COLORS[index % FIRM_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Financial Summary */}
                    <div className="space-y-6">

                        {firmFinancialData.map((item, index) => (
                            <div key={index} className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">{item.name}</span>
                                <span className={`font-semibold ${ item.name === "Expense" || item.name === "Donation" ? "text-red-600" : "text-emerald-600" }`}>₹{item.value.toLocaleString()}</span>
                            </div>
                        ))}

                        <div className="flex justify-between pt-4 text-lg font-bold">
                            <span>Net Balance</span>
                            <span className="text-blue-700">₹{netBalance.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* TOP 10 BAR */}
            <div className="bg-white p-6 rounded-xl shadow border mb-8">
                <h3 className="text-lg font-semibold mb-4">Top 10 Companies by Revenue</h3>
                <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 250 : 300}>
                    <BarChart data={top10Companies}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" hide />
                        <YAxis hide={window.innerWidth < 640} />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#16a34a" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* COMPANY TABLE */}
            <div className="bg-white p-6 rounded-xl shadow border mb-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <h3 className="text-lg font-semibold">Company Sales Analytics</h3>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <input type="text" placeholder="Search company..." value={companySearch} onChange={(e) => { setCompanySearch(e.target.value); setCurrentPage(1); }} className="border rounded-lg px-3 py-2 text-sm"/>
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
                            <option value="desc">Highest Revenue</option>
                            <option value="asc">Lowest Revenue</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-sm text-center">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4">Rank</th>
                                <th className="py-3 px-4">Company</th>
                                <th className="py-3 px-4">Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedCompanies.map((company, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-3 px-4 font-semibold text-blue-600">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td className="py-3 px-4">{company.name}</td>
                                    <td className="py-3 px-4 font-semibold text-emerald-600">₹{company.revenue.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="flex justify-between md:justify-end items-center mt-4 gap-3">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"><i className="fas fa-chevron-left"></i> Prev</button>
                    <span className="px-3 py-1 text-sm">Page {currentPage} of {totalPages}</span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next <i className="fas fa-chevron-right"></i></button>
                </div>
            </div>

            {/* BUSINESS INSIGHTS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 h-50 overflow-y-auto rounded-xl shadow border">
                    <h3 className="font-semibold mb-6 text-center">Top Performing Shops</h3>
                    {topShops.map((shop, i) => (
                        <div key={i} className="flex justify-between text-sm mb-2">
                            <span>{shop.name}</span>
                            <span className="font-semibold text-blue-600">₹{shop.revenue.toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-6 h-50 overflow-y-auto rounded-xl shadow border">
                    <h3 className="font-semibold mb-6 text-center">Payment Aging Summary</h3>
                    {paymentAging.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm mb-2">
                            <span>{item.label}</span>
                            <span className="font-semibold text-amber-600">₹{item.value.toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div id="low-stock-section" className="bg-white p-6 rounded-xl shadow border scroll-mt-24">
                    <h3 className="font-semibold mb-6 text-red-600 text-center">Low Stock Alerts</h3>
                    {stockAlerts.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm mb-2">
                            <span>{item.product}</span>
                            <span className="font-semibold text-red-600">{item.stock} left</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}