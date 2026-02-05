import { useEffect } from "react";
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

export default function D_Menubar({ mobileMenubarOpen, setMobileMenubarOpen }) {
    const location = useLocation();
    const showBottomBar = bottomBarRoutes.includes(location.pathname);
    
    useEffect(() => {
        setMobileMenubarOpen(false);
    }, [location.pathname, setMobileMenubarOpen]);

    return (
        <>
            {/* Desktop View */}
            <aside className=" hidden fixed top-0 left-0 h-full w-70 bg-linear-to-b from-blue-900 to-teal-600 text-white shadow-xl md:flex flex-col px-6 pt-8 z-40">
                <h2 className="text-center text-2xl font-semibold mb-8">Dashboard</h2>

                <nav className="flex flex-col gap-3 text-sm">
                    <NavLink to="/dashboard" end className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-home"></i><span>Home</span></NavLink>
                    <NavLink to="/dashboard/profile" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-user"> </i><span>Profile</span></NavLink>
                    <NavLink to="/dashboard/staffattendance" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-clipboard-list"></i><span>Staff Attendance</span></NavLink>
                    <NavLink to="/dashboard/products" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-box"></i><span>Products</span></NavLink>
                    <NavLink to="/dashboard/ledger" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-book"></i><span>Ledger Book</span></NavLink>
                    <NavLink to="/dashboard/analytics" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-chart-bar"></i><span>Reports & Analytics</span></NavLink>
                    <NavLink to="/dashboard/purchase&sale" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-shopping-cart"></i><span>Purchase & Sales Book</span></NavLink>
                    <NavLink to="/dashboard/payment" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-credit-card"></i><span>Payment</span></NavLink>
                    <NavLink to="/dashboard/registerbook" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-users"></i><span>Register Book</span></NavLink>
                    <NavLink to="/login" className={({ isActive }) =>`${desktopLink} ${isActive ? desktopActive : desktopInactive}`}><i className="fas fa-sign-out-alt"></i><span>Log Out</span></NavLink>
                </nav>
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
