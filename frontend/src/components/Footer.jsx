import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white mt-16">
        {/* Main Footer */}
        <div className="max-w-full mx-auto md:px-22 px-6 text-center py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Company Info */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <img src="https://thumbs.dreamstime.com/z/medical-pharmacy-heart-healthcare-logo-vector-graphic-design-medical-pharmacy-heart-healthcare-logo-vector-graphic-design-template-158027818.jpg" alt="Siddheswari Distributor" className="h-20 w-20 rounded-full border-2 border-white mb-4"/>
                <h3 className="text-xl font-semibold mb-3">Siddheswari Distributor</h3>
                <p className="text-sm text-teal-100 leading-relaxed">Trusted medical distributor delivering quality pharmaceutical products with reliability and care.<br /><br />
                    <span className="font-medium">Your Health, Our Priority.</span>
                </p>
            </div>

            {/* Firms */}
            <div className="flex flex-col">
                <h3 className="text-xl font-semibold mb-8">Our Firms</h3>
                <div className="text-left">
                    <p>
                        <i className="fas fa-clinic-medical mr-2"></i>
                        New Siddheswari Distributors<br />
                        <span className="ml-5 text-teal-100 text-sm"><i className="fas fa-phone-alt mr-1"></i> 99331 52581</span>
                    </p>
                    <p>
                        <i className="fas fa-clinic-medical mr-2"></i>
                        New Gita Enterprise<br />
                        <span className="ml-5 text-teal-100 text-sm"><i className="fas fa-phone-alt mr-1"></i> 80163 27633</span>
                    </p>

                    {/* <p>
                        <i className="fas fa-clinic-medical mr-2"></i>
                        Siddheswari Pharma Services<br />
                        <span className="ml-5"><i className="fas fa-phone-alt mr-1"></i> 9XXXXXXXXX</span>
                    </p> */}
                </div>
            </div>

            {/* Quick Links (Centered Middle) */}
            <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-8">Quick Links</h3>
                <ul className="space-y-3 text-sm text-teal-100 text-center">
                    <li><Link to="/" className="hover:text-white transition hover:underline">Home</Link></li>
                    <li><a href="#about" className="hover:text-white transition hover:underline">About Us</a></li>
                    <li><Link to="/articals" className="hover:text-white transition hover:underline">Articles</Link></li>
                    <li><a href="#contact" className="hover:text-white transition hover:underline">Contact</a></li>
                    <li><Link to="/login" className="hover:text-white transition hover:underline">Sign In</Link></li>
                </ul>
            </div>

            {/* Contact Info */}
            <div>
                <h3 className="text-xl font-semibold mb-8 text-center">Contact Information</h3>
                <ul className="space-y-5 text-sm text-teal-100 text-left">
                    <li className="flex gap-3">
                        <i className="fas fa-map-marker-alt mt-1 text-lg text-white"></i>
                        <span>Kushpata, Ghatal, Paschim Medinipur, West Bengal</span>
                    </li>

                    <li className="flex gap-3 items-center">
                        <i className="fas fa-phone-alt text-white text-lg"></i>
                        <p className="flex gap-2"> +91
                            <a href="tel:+919933152581" className="hover:text-white hover:underline">99331 52581</a> /
                            <a href="tel:+918016327633" className="hover:text-white hover:underline" >80163 27633</a>
                        </p>
                    </li>

                    <li className="flex gap-3 items-center">
                        <i className="fab fa-whatsapp text-green-500 text-xl"></i>
                        <a href="https://wa.me/918016327633" target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp: 80163 27633</a>
                    </li>

                    <li className="flex gap-3 items-center">
                        <i className="fas fa-envelope text-lg text-white"></i>
                        <a href="mailto:siddheswaritelecomghatal@gmail.com" className="hover:text-white break-all">siddheswaritelecomghatal@gmail.com</a>
                    </li>
                </ul>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-teal-700">
            <p className="text-center text-sm text-teal-200 py-4">© {new Date().getFullYear()} Siddheswari Distributor. All rights reserved.</p>
        </div>
    </footer>
  );
}