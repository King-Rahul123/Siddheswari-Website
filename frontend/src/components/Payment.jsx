import { useState } from "react";

export default function Payment() {
  const [method, setMethod] = useState("bank");
  const [copied, setCopied] = useState("");

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen py-10 font-sans mb-10 md:mb-0">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden ring-1 ring-slate-200 transition-all duration-300">
        {/* Header Section */}
        <div className="relative bg-linear-to-r from-teal-700 to-green-600 p-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Payment Hub</h2>
              <p className="mt-2 text-sm font-medium">Manage transactions & digital gateways</p>
            </div>
            <div className="hidden md:flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
              <i className="fas fa-credit-card text-4xl"></i>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Summary Dashboard Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <SummaryCard title="Total Received" value="₹12,500.00" trend="+12% vs last month" color="emerald">
              <i className="bi bi-graph-up-arrow md:text-2xl text-xl text-emerald-700"></i>
            </SummaryCard>
            <SummaryCard title="Transactions" value="18" trend="All processed" color="blue">
              <i className="fas fa-clipboard-list text-xl md:text-2xl"></i>
            </SummaryCard>
          </div>

          {/* Payment Method Selector */}
          <div className="mb-8">
            <h3 className="text-slate-700 font-bold mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>Choose Payment Method
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MethodCard active={method === "bank"} onClick={() => setMethod("bank")} title="Bank Transfer" desc="Direct NEFT / RTGS">
                <i className="fas fa-bank text-2xl"></i>
              </MethodCard>
              
              <MethodCard active={method === "upi"} onClick={() => setMethod("upi")} title="UPI Payment" desc="Instant QR Scan">
                <i className="fas fa-qrcode text-2xl"></i>
              </MethodCard>
            </div>
          </div>

          {/* Content Area */}
          <div className="relative min-h-fit bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 py-4 px-4 md:py-8 md:px-6">
            {/* BANK DETAILS */}
            {method === "bank" && (
              <div className="w-full mx-auto space-y-6 animate-in fade-in duration-500">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-blue-600 rounded-full mb-4 shadow-md">
                    <i className="fas fa-bank text-3xl"></i>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800">Bank Account Details</h4>
                  <p className="text-slate-500 text-sm">Transfer the exact amount to avoid delays.</p>
                </div>

                <div className="space-y-4">
                  <div className="w-full grid grid-cols-1">
                    <CopyField label="Account Holder" value="Siddheswari Distributor" onCopy={() => handleCopy("Siddheswari Distributor", "name")} copied={copied === "name"} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CopyField label="Account Number" value="09876543210123" onCopy={() => handleCopy("09876543210123", "acc")} copied={copied === "acc"} />
                    <CopyField label="IFSC Code" value="SBIN0001234" onCopy={() => handleCopy("SBIN0001234", "ifsc")} copied={copied === "ifsc"} />
                    <CopyField label="Bank Branch" value="Ghatal" disabled />
                    <CopyField label="Bank Name" value="State Bank of India" disabled />
                  </div>
                </div>
              </div>
            )}

            {/* UPI DETAILS */}
            {method === "upi" && (
              <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500">
                <div className="relative group">
                    <div className="absolute -inset-2 bg-linear-to-r from-blue-600 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition"></div>
                    <div className="relative bg-white p-5 rounded-2xl shadow-xl">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=siddheswari@upi" alt="QR" className="w-25 h-25 md:w-40 md:h-40" />
                    </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2 py-2 md:py-3 md:px-4 border rounded-2xl max-w-40 md:max-w-full">
                    <div className="flex-1 min-w-0 font-mono text-sm md:text-base text-slate-800 md:font-bold tracking-wide truncate">
                      <span className="font-mono text-sm md:text-base px-1 text-slate-800 md:font-bold tracking-wide">siddheswari@okaxis</span>
                    </div>
                    <button onClick={() => handleCopy("siddheswari@okaxis", "upi")} className="hover:underline text-xs font-bold uppercase">
                      {copied === "upi" ? (<i className="fas fa-check text-green-500 text-xl"></i>) : (<i className="far fa-copy text-xl text-blue-600"></i>)}
                    </button>
                  </div>
                  <button className="hidden w-full md:flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all">Confirm Payment</button>
                  <button className="md:hidden w-full flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all">Pay Now</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- REUSABLE SUB-COMPONENTS --- */

function SummaryCard({ title, value, trend, color, children }) {
    const isEmerald = color === "emerald";
    return (
        <div className={`p-6 rounded-2xl border ${isEmerald ? "bg-emerald-50 border-emerald-100" : "bg-blue-50 border-blue-100"} relative group transition-all hover:shadow-md`}>
            <div className="relative z-10">
                <p className="text-xs font-bold opacity-60 uppercase tracking-widest text-slate-600">{title}</p>
                <p className="md:text-2xl text-xl font-extrabold mt-1 text-slate-900">{value}</p>
                <p className="text-[11px] font-semibold mt-3 text-slate-500">{trend}</p>
            </div>
            <div className={`absolute right-4 top-4 opacity-10 scale-150 transition-transform ${isEmerald ? "text-emerald-600" : "text-blue-600"}`}>
                {children}
            </div>
        </div>
    );
}

function MethodCard({ active, onClick, title, desc, children }) {
    return (
        <div onClick={onClick} className={`cursor-pointer p-5 rounded-xl border-2 transition-all flex items-center gap-4 relative overflow-hidden ${active ? "border-blue-600 bg-white shadow-lg" : "border-slate-100 bg-white hover:border-slate-200"}`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>{children}</div>
            <div>
              <h5 className={`font-bold ${active ? "text-slate-900" : "text-slate-600"}`}>{title}</h5>
              <p className="text-xs text-slate-400">{desc}</p>
            </div>
            {active && (
              <div className="absolute top-0 right-0 p-1 bg-blue-600 rounded-bl-lg">
                <i className="fas fa-check text-xs text-white"></i>
              </div>
            )}
        </div>
    );
}

function CopyField({ label, value, onCopy, copied, disabled }) {
    return (
        <div className="relative group">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">{label}</label>
            <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-3 group-hover:border-blue-400 transition-all">
                <span className="flex-1 font-mono text-slate-700 font-medium truncate">{value}</span>
                {!disabled && (
                  <button onClick={onCopy} className="ml-3 text-slate-400 hover:text-blue-600 transition-colors">
                      {copied ? (
                        <i className="fas fa-check text-sm text-green-500"></i>
                      ) : (
                        <i className="far fa-copy hover:text-blue-500 text-gray-400 text-lg"></i>
                      )}
                  </button>
                )}
            </div>
        </div>
    );
}