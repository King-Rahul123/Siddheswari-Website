import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen w-full max-w-full overflow-x-hidden pb-20 md:pt-4">
            {/* Notification Popup */}
            <div className="fixed top-20 right-10 w-80 bg-white shadow-xl rounded-xl hidden">
                <div className="bg-teal-700 text-white px-4 py-2 rounded-t-xl font-semibold flex justify-between">
                    <span>🔔 Notifications</span>
                    <button>&times;</button>
                </div>

                <ul className="p-4 space-y-2 text-sm">
                    <li>New order received</li>
                    <li>User registration pending</li>
                    <li>Payment updated</li>
                </ul>
            </div>

            {/* Widgets Section */}
            <div className="px-4 md:px-6 mt-4 md:mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">                    
                    <div onClick={() => navigate("/dashboard/registerbook")} title="Total Registered Users" className="bg-white rounded-xl shadow p-4 md:p-6 text-center">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold">Total Users</h3>
                        <p className="text-xl md:text-lg mt-2 font-bold">0</p>
                    </div>
                    <div onClick={() => navigate("/dashboard/ledger")} title="Total Dues on Market" className="bg-white rounded-xl shadow p-4 md:p-6 text-center">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold">Ledger</h3>
                        <p className="text-xl md:text-lg mt-2 font-bold">₹0</p>
                    </div>
                    <div onClick={() => navigate("/dashboard/")} title="Today's Total Sale" className="bg-white rounded-xl shadow p-4 md:p-6 text-center">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold">Sales</h3>
                        <p className="text-xl md:text-lg mt-2 font-bold">₹0</p>
                    </div>
                    <div onClick={() => navigate("/dashboard/analytics")} title="Monthly Performance" className="bg-white rounded-xl shadow p-4 md:p-6 text-center">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold">Performance</h3>
                        <p className="text-xl md:text-lg mt-2 font-bold">0%</p>
                    </div>
                </div>
            </div>

            {/* ===== COMPLAINTS & NEWS ===== */}
            <div className="px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow">
                    <div className="bg-teal-700 text-white px-4 py-3 rounded-t-xl font-semibold">User Complaints</div>
                    <div className="p-4">
                        <table className="w-full border text-center">
                            <thead className="bg-green-100">
                                <tr>
                                    <th className="border p-2">User ID</th>
                                    <th className="border p-2">Complaint</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="2" className="border p-3 text-gray-600">Error loading complaints.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow">
                    <h2 className="bg-teal-700 text-white px-4 py-3 rounded-t-xl font-semibold">News</h2>
                    <div className="p-4">
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>New medicine stock arriving next week.</li>
                            <li>Annual audit scheduled for September.</li>
                            <li>Staff meeting on Friday at 5 PM.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sign-in Data Section */}
            {/* <div className="signin-overview" id="signinData" style="display: none;">
                <h2><u>Storage Info</u></h2>
                <div style="gap: 5px; align-items: center;">
                    <button onclick="clearStorage()" className="btn">Clear storage</button>
                    <button onclick="deleteSelectedData()" className="btn">Delete Data</button>
                    <div><input type="text" id="shopNameSearch" style="padding: 0px 25px 0px 4px;" placeholder="Search by Shop Name" oninput="filterByShopName()"><i className="fas fa-search" style="margin-left: -25px;"></i></div>
                </div>
                <div id="storage-info" style="margin-top: 20px; color: #333;">
                    <div className="storage-table-container">
                        <table className="storage-table">
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>User ID</th>
                                    <th>Shop Name</th>
                                    <th>Mobile No.</th>
                                    <th>Password</th>
                                    <th>Registered?</th>
                                </tr>
                            </thead>
                            <tbody id="storage-table-body">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}

            {/* Products Section */}
            {/* <div className="products-overview" id="products">
                <h2><u>Products</u></h2>
                Search Box only
                <div>
                    <button onclick="addProduct()" className="btn">Add Products</button> <button onclick="clearStorage()" className="btn">Clear storage</button> <button onclick="removeSelectedProducts()" className="btn">Delete Data</button>
                    <div>
                        <input type="text" id="productsNameSearch" title="Search....." placeholder="Search Products...." />
                        <i className="fas fa-search"></i>
                    </div>
                </div>

                <div id="products-info">
                    <div className="storage-table-container">
                        <table className="storage-table">
                            <thead>
                                <tr>
                                    <th>Sl no.</th>
                                    <th>Product Name</th>
                                    <th>Company Name <i className="fas fa-filter" id="companyFilterIcon"></i>
                                        <select id="companyFilter">
                                            <option value="all">All</option>
                                        </select>
                                    </th>
                                    <th>Quantity</th>
                                    <th>Batch No.</th>
                                    <th>MRP</th>
                                    <th>Exp Date</th>
                                    <th>Trade Price</th>
                                </tr>
                            </thead>
                            <tbody id="products-table-body">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}

            {/* Order Section */}
            {/* <div id="orderSection">
                <h2 className="text-center mb-4">📦 Order Management</h2>
                Order Tabs
                <ul className="nav nav-tabs mb-3" id="orderTabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#placeOrder">Place Order</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#showOrder">Show Order</a>
                    </li>
                </ul>
                <div className="tab-content">
                    Order Section
                    <div className="tab-pane fade show active" id="placeOrder">
                        <h4 className="mb-3">Place Orders</h4>   
                        Order Type Selector
                        <select id="orderType" className="form-select">
                            <option value="select">Select type</option>
                            <option value="sale">Sale</option>
                            <option value="purchase">Purchase</option>
                        </select>
                        Sale Form
                        <div id="saleEntryForm">
                            Header Fields
                            <div>
                                Left Side
                                <div>
                                    <label>Name:</label>
                                    <input type="text" id="shopName" />
                                    <br />
                                    <label>Address:</label>
                                    <input type="text" id="address" />
                                </div>
                                Right Side
                                <div>
                                    <label>Date:</label>
                                    <input type="text" id="currentDate" />
                                    <br />
                                    <label>Bill No.:</label>
                                    <input type="text" id="billNo" />
                                </div>
                            </div><br />
                            
                            Product Table
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Pack</th>
                                        <th>Qty</th>
                                        <th>Free</th>
                                        <th>Batch</th>
                                        <th>MRP</th>
                                        <th>DIS%</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody id="orderTableBody">
                                    <!-- JS will insert 50 rows here -->
                                </tbody>
                            </table>

                            <button className="btn btn-success">Submit</button>
                        </div> */}

                        {/* <!-- Purchase Content -->
                        <div id="purchaseContent" style="display:none; margin-top: 20px;">
                            <h5>📥 Purchase Order Form</h5>
                            <p>Purchase order form content goes here...</p>
                        </div> */}
                    {/* </div>
                </div> */}
                {/* <!-- Show Order Section -->
                <div className="tab-pane fade" id="showOrder">
                    <h4 className="mb-3">Show Orders</h4>

                    <div id="companyOrderContent" style="margin-top: 20px;">
                        <!-- Dynamic content will load here -->
                    </div>
                </div> */}
            {/* </div> */}
        </main>
    );
}