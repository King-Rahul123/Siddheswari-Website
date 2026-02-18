import { Link } from "react-router-dom";

export default function Header({ setSidebarOpen }) {
    return (
        <header className="max-w-full border-b-2 bg-white/70 border-gray-300 flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2">
                <img 
                    src="https://thumbs.dreamstime.com/z/medical-pharmacy-heart-healthcare-logo-vector-graphic-design-medical-pharmacy-heart-healthcare-logo-vector-graphic-design-template-158027818.jpg" 
                    width="40" height="37" border="1" alt="SIDDHESWARI" className="rounded-full border-2 border-black/20" />
                <h1 className="text-xl font-bold">SIDDHESWARI</h1>
            </div>

            {/* Desktop Menu View */}
            <nav className="hidden md:flex gap-6 text-black font-bold">
                <Link to="/" className="hover:text-white p-2 hover:bg-black/40 rounded-sm">Home</Link>
                <Link to="/articals" className="hover:text-white p-2 hover:bg-black/40 rounded-sm">Services</Link>
                <a href="#about" className="hover:text-white p-2 hover:bg-black/40 rounded-sm">About</a>
                <a href="#contact" className="hover:text-white p-2 hover:bg-black/40 rounded-sm">Contact</a>
                <Link to="/login" className="hover:text-white p-2 hover:bg-orange-400 rounded-sm">Sign-in</Link>
            </nav>

            {/* Mobile View */}
            <div className="relative flex items-center justify-between md:hidden gap-3">
                <button className="text-2xl" onClick={() => setSidebarOpen(true)}>&#9776;</button>
            </div>
        </header>
    )
}