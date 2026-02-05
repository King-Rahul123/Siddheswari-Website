import { useEffect } from "react";

export default function Popup({ open, onClose, type }) {
    useEffect(() => {
        if (open) {document.body.style.overflow = "hidden";}
        else {document.body.style.overflow = "auto";}
        return () => {document.body.style.overflow = "auto";};
    }, [open]);
    
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 pb-10 md:pb-0">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 overflow-y-auto md:max-h-180 max-h-130">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-slate-800">{type === "staff" ? "Add Staff" : "Register Shop"}</h2>
                    <button onClick={onClose} className="text-2xl leading-none text-slate-500 hover:text-black">&times;</button>
                </div>
                {type === "staff" ? (
                    <StaffForm onClose={onClose} />
                ) : (
                    <ShopForm onClose={onClose} />
                )}
            </div>
        </div>
    );
}

/* =====================================================
   SHOP REGISTRATION FORM
===================================================== */

function ShopForm({ onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Shop registered successfully");
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* BASIC INFO */}
            <div className="bg-slate-50 border rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Shop Name" required />
                    <Input label="Mobile Number" required />
                    <Input label="Proprietor Name" required />
                    <File label="Proprietor Image" required />
                </div>
                <Input label="Email Address" type="email" />
            </div>

            {/* ADDRESS */}
            <div className="bg-slate-50 border rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Address Details</h3>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-4">
                    <Select label="State" required
                        options={["West Bengal", "Odisha", "Bihar", "Jharkhand"]}
                    />
                    <Select label="District" required
                        options={["Kolkata", "Howrah", "Hooghly", "North 24 Parganas"]}
                    />
                    <Select label="City" required
                        options={["Kolkata", "Howrah", "Chandannagar"]}
                    />
                    <Input label="PIN Code" required />
                </div>
                <Textarea label="Permanent Address" required />
                <Textarea label="Shop Address" required />
            </div>

            {/* DOCUMENTS */}
            <div className="bg-slate-50 border rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Identity & Licences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Aadhar Number" required />
                    <File label="Aadhar Image / PDF" required />
                    <Input label="PAN Number" required />
                    <File label="PAN Image / PDF" required />
                    <Input label="Drug Licence Number" required />
                    <File label="Drug Licence Image / PDF" required />
                    <Input label="BCDA Number" required />
                    <File label="BCDA Image / PDF" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-slate-600">GST Number</span>
                            <i className="fas fa-info-circle text-gray-400 text-xs cursor-pointer hover:text-blue-600" 
                                title="GST is optional. If not provided, GST benefits will not be applied."
                            ></i>
                        </label>
                        <Input />
                    </div>
                    <File label="GST Image / PDF (Optional)" />
                    </div>
            </div>
            
            {/* Mandatory note */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between -mt-2 pl-5 pr-5">
                <label className="flex items-center gap-2 text-xs md:text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" required className="h-3 w-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                    <span>I accept the <strong className="text-slate-700">Terms & Conditions</strong></span>
                </label>
                <p className="text-xs md:text-sm text-red-500">* Fields marked with are mandatory</p>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-medium">Register Shop</button>
            </div>
        </form>
    );
}

/* =====================================================
   STAFF ADD FORM
===================================================== */

function StaffForm({ onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Staff added successfully");
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-slate-50 border rounded-xl p-4 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Name" />
                    <Input label="Mobile Number" />
                    <File label="Image" />
                    <Input label="Salary" type="number" />
                </div>
                <Textarea label="Permanent Address" />
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Department</label>
                    <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        <option value="">Select Department</option>
                        <option>Accounts</option>
                        <option>Billing</option>
                        <option>Delivery Man</option>
                        <option>Driver</option>
                        <option>Store</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Aadhar Number" />
                    <File label="Aadhar Image / PDF" />
                </div>
            </div>
            <p className="text-sm text-red-500 -mt-3 mb-2 text-right mr-5">All fields are mandatory</p>
            <div className="flex justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium">Add Staff</button>
            </div>
        </form>
    );
}

/* =====================================================
   REUSABLE INPUT COMPONENTS
===================================================== */

function Input({ label, type = "text", required }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">{label} {required && <span className="text-red-600">*</span>}</label>
            <input type={type} required={required} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
        </div>
    );
}

function Textarea({ label, required }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">{label} {required && <span className="text-red-600">*</span>}</label>
            <textarea rows="3" required={required} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
    );
}

function File({ label, required }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">{label} {required && <span className="text-red-600">*</span>}</label>
            <input type="file" accept="image/*,.pdf" required={required} className="w-full rounded-lg border border-gray-300 bg-white p-2 file:mr-3 file:rounded-md file:border file:border-gray-300 file:bg-slate-100 file:px-3 file:py-1 hover:file:bg-slate-200"/>
        </div>
    );
}

function Select({ label, options = [], required }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">{label} {required && <span className="text-red-600">*</span>}</label>
            <select required={required} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select {label}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}