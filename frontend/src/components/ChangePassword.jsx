import { motion as Motion } from "framer-motion";

export default function ChangePassword({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        
            <Motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-teal-100 text-teal-700">
                        <i className="fas fa-user-shield text-lg"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-teal-700">Change Password</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-2xl">&times;</button>
                </div>

                {/* Form */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">User ID / Phone</label>
                        <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"/>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">New Password</label>
                        <input type="password" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"/>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
                        <input type="password" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"/>
                    </div>

                    <button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 rounded-lg transition">Change Password</button>
                </form>
            </Motion.div>
        </div>
    );
}
