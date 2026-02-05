export default function Analytics() {
    return (
        <div className="min-h-screen w-full max-w-full overflow-x-hidden px-6 md:px-8 py-10">
            <h2 className="md:text-3xl text-xl font-semibold mb-8 text-center">📊 Analytics Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sale & Return */}
                <div className="bg-white rounded-xl shadow w-full">
                    <div className="flex items-center justify-between px-4 py-3 border-b font-semibold">
                        <span>Sale & Return</span>
                        <select id="saleReturnSelect" className="border rounded px-2 py-1 text-sm">
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>

                    <div className="p-4">
                        <canvas id="trafficChart"></canvas>
                    </div>
                </div>

                {/* Revenue Trends */}
                <div className="bg-white rounded-xl shadow">
                    <div className="flex flex-wrap gap-3 items-center justify-between px-4 py-3 border-b font-semibold">
                        <span className="flex-1">Revenue Trends</span>
                        <div className="flex gap-2">
                            <select id="revenueSelect" className="border rounded px-2 py-1 text-sm">
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                            <select id="revenueSubSelect" className="border rounded px-2 py-1 text-sm">
                                {/* dynamic options */}
                            </select>
                        </div>
                    </div>

                    <div className="p-4">
                        <canvas id="revenueChart"></canvas>
                    </div>
                </div>

                {/* Overall Performance */}
                <div className="bg-white rounded-xl shadow">
                    <div className="flex items-center justify-between px-4 py-3 border-b font-semibold">
                        <span>Overall Performance</span>
                        <select id="performanceSelect" className="border rounded px-2 py-1 text-sm">
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>

                    <div className="p-4">
                        <canvas id="performanceChart"></canvas>
                    </div>
                </div>

                {/* Annual Turnover */}
                <div className="bg-white rounded-xl shadow">
                    <div className="flex items-center justify-between px-4 py-3 border-b font-semibold">
                        <span>Annual Turnover</span>
                        <select id="growthSelector" className="border rounded px-2 py-1 text-sm" defaultValue="overall">
                            <option value="overall">Overall</option>
                        </select>
                    </div>

                    <div className="p-4">
                        <canvas id="growthChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}