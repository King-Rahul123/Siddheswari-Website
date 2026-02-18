import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = ({ open, setOpen }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? "text-black font-bold" : "text-white";

  // Auto-close sidebar when screen becomes desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {setOpen(false);}
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setOpen]);

    return (
        <>
            {open && (<div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />)}

            {/* Sidebar */}
            <aside className={`md:hidden fixed top-0 right-0 h-screen w-64 bg-orange-400 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>
                <button className="absolute top-4 right-4 text-4xl font-bold text-black" onClick={() => setOpen(false)} aria-label="Close menu">&times;</button>

                <nav className="mt-16 px-6">
                    <ul className="flex flex-col gap-4 text-lg">
                        <Link to="/" className={isActive("/")} onClick={() => setOpen(false)}>Home</Link>
                        <Link to="/articals" className={isActive("/articals")} onClick={() => setOpen(false)}>Services</Link>
                        <a href="#about" className="text-white" onClick={() => setOpen(false)}>About</a>
                        <a href="#contact" className="text-white" onClick={() => setOpen(false)}>Contact Us</a>
                        <Link to="/login" className={isActive("/login")} onClick={() => setOpen(false)}>Sign-in</Link>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
