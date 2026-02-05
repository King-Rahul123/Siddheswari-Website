import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Articals from "./pages/Articals";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Analytics from "./components/Analytics";
import D_Header from "./components/D_Header";
import D_Menubar from "./components/D_Menubar";
import Profile from "./components/Profile";
import Payment from "./components/Payment";
import MedicalLedger from "./components/Ledger";
import StaffAttendance from "./components/StaffAttendance";
import RegisterBook from "./components/RegisterBook";
import Products from "./components/Products";
import Purchase_Sale from "./components/Purchase_Sale";

/* ---------- PUBLIC LAYOUT ---------- */
function PublicLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <Home />
      <Footer />
    </>
  );
}

/* ---------- DASHBOARD LAYOUT (FIXED) ---------- */
function DashboardLayout() {
  const location = useLocation();
  const [mobileMenubarOpen, setMobileMenubarOpen] = useState(false);

  // Show header ONLY
  const showHeader = ["/dashboard", "/dashboard/analytics", "/dashboard/profile"].includes(location.pathname);

  return (
    <div className="flex bg-green-200">                 {/* only flex and bg-green-200 if background need */}
      {/* WATERMARK */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center opacity-10">
        <p className="text-[90px] font-bold text-slate-800 rotate-[-30deg] select-none">Siddheswari & Gita</p>
      </div>
      {/* <div className="absolute inset-0 backdrop-blur-md z-0"></div>                     remove it if blur not need */}
      <D_Menubar mobileMenubarOpen={mobileMenubarOpen} setMobileMenubarOpen={setMobileMenubarOpen} />
      <div className="flex-1 relative z-10">                                            {/* remove relative z-20 and remove z-40 on desktop Menubar view */}
        {showHeader && <D_Header setMobileMenubarOpen={setMobileMenubarOpen} />}
        <div className="md:ml-72 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/* ---------- APP ---------- */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />} />

        {/* Standalone pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/articals" element={<Articals />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="payment" element={<Payment />} />
          <Route path="ledger" element={<MedicalLedger />} />
          <Route path="staffattendance" element={<StaffAttendance />} />
          <Route path="registerbook" element={<RegisterBook />} />
          <Route path="products" element={<Products />} />
          <Route path="purchase&sale" element={<Purchase_Sale />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
