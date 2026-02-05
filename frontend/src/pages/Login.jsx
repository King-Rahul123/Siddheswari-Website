import { useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import ChangePassword from "../components/ChangePassword";

export default function Login() {
    const [showForgot, setShowForgot] = useState(false);
    const [mode, setMode] = useState("login");

    const formVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"> 
                {/* HEADER */}
                <div className="text-center mb-8 flex flex-col items-center justify-center gap-4">
                    <i className="fas fa-user-circle text-4xl text-teal-700"></i>
                    <h2 className="text-2xl font-bold text-teal-700">
                        {mode === "login" ? "Login to Your Account" : "Create an Account"}
                    </h2>
                </div>

                <AnimatePresence mode="wait">
                    <Motion.form key={mode} variants={formVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.35, ease: "easeInOut" }} className="space-y-5">
                        {mode === "signup" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Shop Name</label>
                                <input type="text" placeholder="Enter shop name" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">{mode === "login" ? "User ID / Phone" : "Phone Number"}</label>
                            <input type="text" placeholder="Enter phone number" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                            <input type="password" placeholder="Enter password" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                        </div>

                        {mode === "login" && (
                            <div className="text-right">
                                <button type="button" onClick={() => setShowForgot(true)} className="text-sm text-teal-600 hover:underline">Forgot password?</button>
                            </div>
                        )}

                        <button type="submit" className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-lg transition">
                            {mode === "login" ? "Login" : "Sign Up"}
                        </button>
                    </Motion.form>
                </AnimatePresence>

                {/* FOOTER */}
                <div className="text-center mt-6 text-sm text-gray-600">
                    {mode === "login" ? (
                        <>
                            Don’t have an account?{" "}
                            <button onClick={() => setMode("signup")} className="text-teal-700 font-medium hover:underline">Sign Up</button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button onClick={() => setMode("login")} className="text-teal-700 font-medium hover:underline">Login</button>
                        </>
                    )}
                </div>
            </Motion.div>

            <AnimatePresence>
            {showForgot && (
                <ChangePassword onClose={() => setShowForgot(false)} />
            )}
            </AnimatePresence>
        </div>
    );
}
