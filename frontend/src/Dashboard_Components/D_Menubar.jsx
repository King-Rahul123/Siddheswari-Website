import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const desktopLink =
  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200";

const desktopActive =
  "bg-white text-blue-900 font-semibold shadow-md";

const desktopInactive =
  "text-white hover:bg-white/20";

const bottomBarRoutes = [
  "/dashboard/ledger",
  "/dashboard/purchase&sale",
  "/dashboard/payment",
  "/dashboard/staffattendance",
  "/dashboard/registerbook",
  "/dashboard/products",
];

// Style for dropdown button when expanded (different from active link)
const desktopExpanded = "bg-white/10 text-white font-medium";

export default function D_Menubar({ mobileMenubarOpen, setMobileMenubarOpen }) {
    const location = useLocation();
    const currentTab = new URLSearchParams(location.search).get("tab");
    const showBottomBar = bottomBarRoutes.includes(location.pathname);

    // Check if a child page under each section is currently active
    const isStaffChildActive = useMemo(() => [
        "/dashboard/staffattendance",
        "/dashboard/staffledger",
    ].includes(location.pathname), [location.pathname]);

    const isLedgerBookChildActive = useMemo(() => [
        "/dashboard/ledger",
    ].includes(location.pathname), [location.pathname]);

    const isPurchaseAndSalesBookChildActive = useMemo(() => [
        "/dashboard/purchasebook",
        "/dashboard/salesbook"
    ].includes(location.pathname), [location.pathname]);

    // Derive the open menu from the current route instead of using setState in an effect
    const derivedOpenMenu = useMemo(() => {
        if (isStaffChildActive) return "staff";
        if (isLedgerBookChildActive) return "ledger";
        if (isPurchaseAndSalesBookChildActive) return "purchase";
        return null;
    }, [isStaffChildActive, isLedgerBookChildActive, isPurchaseAndSalesBookChildActive]);

    const [openMenu, setOpenMenu] = useState(derivedOpenMenu);

    // Sync openMenu when route changes
    useEffect(() => {
        setOpenMenu(derivedOpenMenu);
    }, [derivedOpenMenu]);
    
    useEffect(() => {
        setMobileMenubarOpen(false);
    }, [location.pathname, setMobileMenubarOpen]);

    return (
        <>
            {/* Desktop View */}
            <aside className="hidden fixed top-0 left-0 h-screen w-70 bg-linear-to-b from-blue-900 to-teal-600 text-white shadow-xl md:flex flex-col z-50">
                
                <div className="px-6 pt-8 pb-6 border-b border-white/20">
                    <h2 className="text-center text-2xl font-semibold">Dashboard</h2>
                </div>

                <nav className="flex-1 overflow-y-auto no-scrollbar px-6 mt-3 flex flex-col gap-2 text-sm">
                    <NavLink to="/dashboard" end className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}>
                        <i className="fas fa-home"></i>
                        <span>Home</span>
                    </NavLink>
                    {/* <NavLink to="/dashboard/profile" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-user"> </i><span>Profile</span></NavLink> */}
                    <div>
                        <button onClick={() => setOpenMenu(openMenu === "staff" ? null : "staff")} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${isStaffChildActive ? "bg-white/10 font-semibold shadow-md" : openMenu === "staff" ? desktopExpanded : desktopInactive}`}>
                            <div className="flex items-center gap-3">
                                <i className="fas fa-users"></i>
                                <span className="font-medium">Staff Details</span>
                            </div>
                            <i className={`fas fa-chevron-down transition-transform duration-300 ${openMenu === "staff" ? "rotate-180" : ""}`}></i>
                        </button>
                        <div className={`overflow-hidden transform origin-top transition-all duration-300 ease-in-out ${openMenu === "staff" ? "scale-y-100 opacity-100 min-h-fit" : "scale-y-0 opacity-0 max-h-0"}`}>
                            <div className="ml-6 space-y-2 mt-2 md:text-sm text-xs">
                                <NavLink to="/dashboard/registerbook?tab=staff" className={() =>`${desktopLink} ${ location.pathname === "/dashboard/registerbook" && currentTab === "staff" ? desktopActive : desktopInactive}`}>
                                    <i className="fas fa-user"></i>
                                    Staff Details
                                </NavLink>
                                <NavLink to="/dashboard/staffattendance" className={({ isActive }) => `${desktopLink} ${isActive ? desktopActive : desktopInactive}`}>
                                    <i className="fas fa-clipboard-list"></i>
                                    Staff Attendance
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <NavLink to="/dashboard/products" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}>
                        <i className="fas fa-box"></i>
                        <span>Products</span>
                    </NavLink>
                    {/* <NavLink to="/dashboard/ledger" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-book"></i><span>Ledger Book</span></NavLink> */}
                    <div>
                        <button onClick={() => setOpenMenu(openMenu === "ledger" ? null : "ledger")} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${isLedgerBookChildActive ? "bg-white/10 font-semibold shadow-md" : openMenu === "ledger" ? desktopExpanded : desktopInactive}`}>
                            <div className="flex items-center gap-3">
                                <i className="fas fa-book"></i>
                                <span className="font-medium">Ledger Book</span>
                            </div>
                            <i className={`fas fa-chevron-down transition-transform duration-300 ${openMenu === "ledger" ? "rotate-180" : ""}`}></i>
                        </button>
                        <div className={`overflow-hidden transform origin-top transition-all duration-300 ease-in-out ${openMenu === "ledger" ? "scale-y-100 opacity-100 min-h-fit" : "scale-y-0 opacity-0 max-h-0"}`}>
                            <div className="ml-6 space-y-2 mt-2 md:text-sm text-xs">
                                <NavLink to="/dashboard/ledger?tab=my" className={() => `${desktopLink} ${ location.pathname === "/dashboard/ledger" && new URLSearchParams(location.search).get("tab") === "my" ? desktopActive : desktopInactive }`}>
                                    <i className="bi bi-journal"></i>
                                    My Ledger
                                </NavLink>
                                <NavLink to="/dashboard/ledger?tab=party" className={() => `${desktopLink} ${ location.pathname === "/dashboard/ledger" && new URLSearchParams(location.search).get("tab") === "party" ? desktopActive : desktopInactive }`}>
                                    <i className="fas fa-book-open"></i>
                                    Party Ledger
                                </NavLink>
                                <NavLink to="/dashboard/ledger?tab=staff" className={() => `${desktopLink} ${ location.pathname === "/dashboard/ledger" && new URLSearchParams(location.search).get("tab") === "staff" ? desktopActive : desktopInactive }`}>
                                    <i className="bi bi-journal-text"></i>
                                    Staff Ledger
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <NavLink to="/dashboard/analytics" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}>
                        <i className="fas fa-chart-bar"></i>
                        <span>Reports & Analytics</span>
                    </NavLink>
                    {/* <NavLink to="/dashboard/purchase&sale" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-shopping-cart"></i><span>Purchase & Sales Book</span></NavLink> */}
                    
                    <div>
                        <button onClick={() => setOpenMenu(openMenu === "purchase" ? null : "purchase")} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${isPurchaseAndSalesBookChildActive ? "bg-white/10 font-semibold shadow-md" : openMenu === "purchase" ? desktopExpanded : desktopInactive}`}>
                            <div className="flex items-center gap-3">
                                <i className="fas fa-shopping-cart"></i>
                                <span className="font-medium">Purchase & Sales Book</span>
                            </div>
                            <i className={`fas fa-chevron-down transition-transform duration-300 ${openMenu === "purchase" ? "rotate-180" : ""}`}></i>
                        </button>
                        <div className={`overflow-hidden transform origin-top transition-all duration-300 ease-in-out ${openMenu === "purchase" ? "scale-y-100 opacity-100 max-h-fit" : "scale-y-0 opacity-0 max-h-0"}`}>
                            <div className="ml-6 space-y-2 mt-2 md:text-sm text-xs">
                                <NavLink to="/dashboard/purchase&sale" className={({ isActive }) => `${desktopLink} ${isActive ? desktopActive : desktopInactive}`}>
                                    <i className="fas fa-shopping-cart"></i>
                                    Purchase Book
                                </NavLink>
                                <NavLink to="/dashboard/salesbook" className={({ isActive }) => `${desktopLink} ${isActive ? desktopActive : desktopInactive}`}>
                                    <i className="fas fa-reply"></i>
                                    Sales Book
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <NavLink to="/dashboard/payment" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}>
                        <i className="fas fa-credit-card"></i>
                        <span>Payment</span>
                    </NavLink>
                    <NavLink to="/dashboard/registerbook?tab=shop" className={() =>`${desktopLink} ${ location.pathname === "/dashboard/registerbook" && currentTab === "shop" ? desktopActive : desktopInactive}`}>
                        <i className="fas fa-users"></i>
                        <span>Register Book</span>
                    </NavLink>
                </nav>

                <div className="px-6 py-6 border-t border-white/20">
                    <button className="w-full flex items-center justify-center text-sm gap-2 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200 shadow-md">
                        <i className="fas fa-sign-out-alt"></i>
                        Log Out
                    </button>
                </div>
                {/* <NavLink to="/login" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-sign-out-alt"></i><span>Log Out</span></NavLink> */}
            </aside>

            {/* Mobile Backdrop (tap outside to close) */}
            {mobileMenubarOpen && (
                <div className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setMobileMenubarOpen(false)}/>
            )}

            {/* Mobile Menubar */}
            {mobileMenubarOpen && (
                <aside className="md:hidden fixed top-0 right-0 h-full w-40 bg-white/20 backdrop-blur-xl text-white shadow-xl z-50 transform transition-transform duration-300 translate-x-0">
                    <h2 className="text-center text-2xl font-semibold mt-8 mb-6">Menu</h2>
                    <nav className="flex flex-col gap-3 px-4 text-sm">
                        <NavLink to="/dashboard" end className={({ isActive }) =>`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive ? "bg-white/30 text-yellow-300" : "text-white/80"}`}><i className="fas fa-home text-base"></i><span>Home</span></NavLink>
                        <NavLink to="/dashboard/staffattendance" className={({ isActive }) =>`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive ? "bg-white/30 text-yellow-300" : "text-white/80"}`}><i className="fas fa-clipboard-list text-base"></i><span>Staff</span></NavLink>
                        <NavLink to="/dashboard/products" className={({ isActive }) =>`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive ? "bg-white/30 text-yellow-300" : "text-white/80"}`}><i className="fas fa-box text-base"></i><span>Products</span></NavLink>
                        <NavLink to="/dashboard/ledger" className={({ isActive }) =>`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive ? "bg-white/30 text-yellow-300" : "text-white/80"}`}><i className="fas fa-book text-base"></i><span>Ledger</span></NavLink>
                        <NavLink to="/dashboard/analytics" className={({ isActive }) =>`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive ? "bg-white/30 text-yellow-300" : "text-white/80"}`}><i className="fas fa-chart-bar text-base"></i><span>Analytics</span></NavLink>
                        <NavLink to="/dashboard/purchase&sale" className={({ isActive }) =>`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive ? "bg-white/30 text-yellow-300" : "text-white/80"}`}><i className="fas fa-shopping-cart text-base"></i><span>Bill Book</span></NavLink>
                        <NavLink to="/dashboard/payment" className={({ isActive }) =>`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive ? "bg-white/30 text-yellow-300" : "text-white/80"}`}><i className="fas fa-credit-card text-base"></i><span>Payment</span></NavLink>
                        <NavLink to="/dashboard/registerbook" className={({ isActive }) =>`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive ? "bg-white/30 text-yellow-300" : "text-white/80"}`}><i className="fas fa-users text-base"></i><span>Register</span></NavLink>
                        <NavLink to="/login" className={({ isActive }) =>`flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive ? "bg-white/30 text-yellow-300" : "text-white/80"}`}><i className="fas fa-sign-out-alt text-base"></i><span>Logout</span></NavLink>
                    </nav>
                </aside>
            )}
            {/* Mobile Bottom Menubar */}
            {showBottomBar && (
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-600 shadow-xl border-t z-50">
                <nav className="flex justify-around py-2 text-xs">
                    <NavLink to="/dashboard/staffattendance" end className={({ isActive }) =>`flex flex-col items-center gap-1 w-12 py-1 rounded-t-lg transition-all ${isActive ? "bg-white text-black" : "text-white"}`}><i className="fas fa-user text-lg"></i><span>Staff</span></NavLink>
                    <NavLink to="/dashboard/ledger" className={({ isActive }) =>`flex flex-col items-center gap-1 w-12 py-1 rounded-t-lg transition-all ${isActive? "bg-white text-black": "text-white"}`}><i className="fas fa-book text-lg"></i><span>Ledger</span></NavLink>
                    <NavLink to="/dashboard/purchase&sale" className={({ isActive }) =>`flex flex-col items-center gap-1 w-12 py-1 rounded-t-lg transition-all ${isActive? "bg-white text-black": "text-white"}`}><i className="fas fa-shopping-cart text-lg"></i><span>Bill Book</span></NavLink>
                    <NavLink to="/dashboard/payment" className={({ isActive }) =>`flex flex-col items-center gap-1 w-12 py-1 rounded-t-lg transition-all ${isActive? "bg-white text-black": "text-white"}`}><i className="fas fa-credit-card text-lg"></i><span>Pay</span></NavLink>
                    <button onClick={() => setMobileMenubarOpen(true)} className="flex flex-col items-center gap-1 w-12 py-1 rounded-t-lg transition-all text-white"><i className="fas fa-bars text-lg"></i><span>More</span></button>
                </nav>
            </div>
            )}
        </>
    );
}
