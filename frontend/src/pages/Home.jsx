import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Loader from "../components/Loader";


export default function Home() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const formRef = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            "service_xxxxxxx",      // your SERVICE ID
            "template_xxxxxxx",     // your TEMPLATE ID
            formRef.current,
            "public_xxxxxxx"        // your PUBLIC KEY
        )
        .then(() => {
            alert("Message sent successfully!");
            formRef.current.reset();
        })
        .catch((error) => {
            alert("Failed to send message!");
            console.error(error);
        });
    };
    
    useEffect(() => {
        const controller = new AbortController();
        
        // ⏳ simulate slow network / API
        const timer = setTimeout(async () => {
            try {
                // example API call
                const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
                    signal: controller.signal,
                });
                
                if (!res.ok) throw new Error("Network error");
                
                setLoading(false);
            } catch {
                setError(true);
                setLoading(false);
            }
        }, 1500); // loader shows only if slow (>1.5s)
        
        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, []);
    
    // ❌ NETWORK ERROR
    if (error) {
        return <Loader message="Network error. Please check your connection." />;
    }

    // ⏳ LOADING / SLOW NETWORK
    if (loading) {
        return <Loader message="Loading, please wait..." />;
    }
    
    return (
        <main className="flex flex-col gap-70 w-full px-5 py-30 md:px-40 md:py-50">
            <section className="flex flex-col items-center gap-4 text-center">
                <img src="https://thumbs.dreamstime.com/z/medical-pharmacy-heart-healthcare-logo-vector-graphic-design-medical-pharmacy-heart-healthcare-logo-vector-graphic-design-template-158027818.jpg" alt="SIDDHESWARI" className="rounded-full border-2 h-30 w-30 md:h-40 md:w-40" />
                <h1 className="md:text-4xl text-black font-bold text-2xl">Welcome to Siddheswari Distributor</h1>
                <p className="text-black text-sm md:text-xl">Your Health, Our Priority <br />Supporting Your Journey Towards Better Health</p> 
            </section>

            <section id="about" className="flex flex-col items-center gap-4 text-center bg-white/70 md:p-10 p-5 rounded-2xl box-border border-2 border-gray-300 shadow-lg">
                <h2 className="md:text-3xl font-semibold text-teal-700 text-2xl"><u>About</u></h2>
                <nav className="md:text-lg text-sm md:p-5 p-2 bg-white/70 rounded-2xl box-border border-2 border-gray-200 shadow-md space-y-8">
                    <p>At Siddheswari Medical Distributor, we are committed to supporting your journey towards better health. With over 27 years of experience, we have proudly served the healthcare industry by providing high-quality medical products and pharmaceutical supplies to clinics, hospitals, and pharmacies across the region.</p>
                    <p>Our mission is to make healthcare more accessible by delivering trusted medical solutions with efficiency and care. We work closely with leading pharmaceutical companies and suppliers to ensure that our clients receive only the best products to support their medical needs.</p>
                    <p>From life-saving medications to essential healthcare products, our extensive range covers every aspect of healthcare, and our dedicated team ensures timely deliveries and exceptional customer service. At Siddheswari, your health is our priority, and we are here to make a positive difference in your wellbeing.</p>
                    <p>Whether you are a healthcare professional or an individual in need of medical supplies, Siddheswari is your reliable partner in health. We are here to serve, support, and stand by you every step of the way.</p>
                    <p className="mt-5"><b className="text-red-500">Note: </b><b>You have to sign-in before registering your shop to buy products</b></p>
                </nav>
                <a href="/articals" className="p-2 bg-orange-400 text-white hover:bg-orange-500 rounded-sm">Learn More</a>
            </section>
            
            <section id="contact" className="flex justify-center items-center w-full bg-cover bg-center py-16 px-4">
                <div className="w-full max-w-3xl bg-white/85 rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12">                    
                    <h2 className="text-2xl md:text-3xl font-semibold text-center text-teal-700 underline mb-8">Contact Us</h2>
                    <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-6">
                        <input type="text" name="user_name" placeholder="Your Name" required className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:bg-white focus:ring-gray-300" />
                        <input type="email" name="user_email" placeholder="Your Email" required className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:bg-white focus:ring-gray-300" />
                        <textarea name="message" rows="5" placeholder="Your Message" required className="w-full border border-gray-300 rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-1 focus:bg-white focus:ring-gray-300"></textarea>
                        <button type="submit" className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-md transition duration-300">Send Message</button>
                    </form>
                </div>
            </section>
        </main>
    );
}