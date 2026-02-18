import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "../Dashboard_pages/Popup";

export default function D_Header({ setMobileMenubarOpen }) {
    const [time, setTime] = useState(new Date());
    const [profileOpen, setProfileOpen] = useState(false);
    const [profileAnchor, setProfileAnchor] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="md:ml-70 px-6 pt-6 max-w-screen">
            <header className="flex items-center justify-between rounded-xl bg-linear-to-r from-blue-600 to-teal-500 text-white px-6 py-4 shadow-lg">
                <h2 className="text-xl font-semibold hidden md:flex md:flex-row flex-col gap-2">Welcome<p className="text-yellow-300 italic">Prasanta Kumar Adak</p>!</h2>
                <h2 className="md:hidden flex text-lg font-semibold">Dashboard</h2>
                
                <div className="flex items-center gap-6">
                    {/* Date & Time */}
                    <div className="text-sm text-right leading-tight hidden md:flex md:flex-col">
                        <p className="text-black font-bold">{time.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</p>
                        <p className="font-mono text-black font-bold">{time.toLocaleTimeString()}</p>
                    </div>

                    {/* Notification */}
                    <button className="relative hidden md:block hover:bg-white/20 p-1 rounded-full">
                        <i className="far fa-bell text-2xl text-black"></i>
                        <span className="absolute -top-1 right-0 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
                    </button>

                    {/* Profile */}
                    <button onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setProfileAnchor(rect); setProfileOpen(true); }} className="h-10 w-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <img src="https://i.pravatar.cc/40" alt="Profile" className="h-full w-full object-cover" />
                    </button>

                    {/* Menue Bar */}
                    <button className="md:hidden" onClick={() => setMobileMenubarOpen(prev => !prev)}>
                        <i className="fas fa-bars text-2xl text-black"></i>
                    </button>
                </div>
            </header>
            <Popup open={profileOpen} onClose={() => setProfileOpen(false)} type="profile" anchorRect={profileAnchor} />
        </div>
    );
}
