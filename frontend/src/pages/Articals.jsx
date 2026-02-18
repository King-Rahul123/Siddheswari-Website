import { useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";

export default function Articals() {
  const [activeCompany, setActiveCompany] = useState("siddheswari");

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <div className="min-h-screen bg-white/50">
      {/* HEADER */}
      {activeCompany === "siddheswari" ? (
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-amber-500 text-white shadow">
          <button onClick={() => window.history.back()} className="border border-white px-2 py-1 rounded hover:bg-white hover:text-amber-600 transition"><i className="fas fa-arrow-left"></i></button>
          <h1 className="text-xl md:text-3xl font-bold text-center">New Siddheswari Distributors</h1>
          <button onClick={() => setActiveCompany("gita")} className="border border-white px-3 py-2 rounded hover:bg-white hover:text-amber-600 transition">
            <Motion.i className="fas fa-exchange-alt" whileTap={{ rotate: 180 }} transition={{ duration: 0.3 }}/>
          </button>
        </header>
      ) : (
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-green-500 text-white shadow">
          <button onClick={() => window.history.back()} className="border border-white px-2 py-1 rounded hover:bg-white hover:text-green-600 transition"><i className="fas fa-arrow-left"></i></button>
          <h1 className="text-xl md:text-3xl font-bold text-center">New Gita Enterprise</h1>
          <button onClick={() => setActiveCompany("siddheswari")} className="border border-white px-3 py-2 rounded hover:bg-white hover:text-green-600 transition">
            <Motion.i className="fas fa-exchange-alt" whileTap={{ rotate: 180 }} transition={{ duration: 0.3 }}/>
          </button>
        </header>
      )}

      {/* CONTENT */}
      <main className="pt-28 pb-24 flex justify-center">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg px-8 py-10">   
          <AnimatePresence mode="wait">
            {activeCompany === "siddheswari" && (
              <Motion.article
                key="siddheswari"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="space-y-6"
              >
              <img src="New Siddheswari.jpg" alt="New Siddheswari Medical Distributors" className="mx-auto rounded-3xl shadow max-w-sm"/>
              <h2 className="text-3xl font-bold text-amber-500 border-b-2 border-amber-500 pb-2">About Us</h2>
              <p>
                New Siddheswari Medical Distributors is a trusted name in the pharmaceutical
                distribution industry, serving healthcare institutions with dedication and
                reliability for over two decades. Based in Kushpata, Ghatal, Paschim Medinipur,
                we specialize in supplying high-quality medicines and healthcare products to
                hospitals, pharmacies, and medical professionals across the region.
              </p>
              <p>
                The company was founded and is led by <strong>Prasanta Kumar Adak</strong> and <strong>Rahull Kumar Adak</strong>,
                the proprietors of New Siddheswari Distributors, who brings over two decades of experience in pharmaceutical distribution. 
                His leadership, ethical business values, and deep understanding of the healthcare supply chain have been 
                instrumental in building the company’s strong reputation and long-standing relationships with clients.
              </p>
              <p>
                With a firm commitment to quality, transparency, and customer satisfaction,
                the organization works closely with reputed pharmaceutical companies to ensure
                timely delivery and consistent availability of essential medicines. Supported
                by an experienced team and efficient logistics, New Siddheswari Medical
                Distributors continues to contribute to better healthcare outcomes through
                dependable service and professional excellence.
              </p>

              <h2 className="text-3xl font-bold text-amber-500 border-b-2 border-amber-500 pb-2">Founder</h2>
              <img src="./assets/RKA.jpg" alt="Founder" className="mx-auto rounded-lg shadow max-w-xs"/>
              <p><strong>Prasanta Kumar Adak</strong> is the visionary behind New Siddheswari Medical Distributors. With extensive experience in the pharmaceutical industry, he has guided the company towards excellence in service delivery and customer satisfaction.</p>
              
              <h2 className="text-3xl font-bold text-amber-500 border-b-2 border-amber-500 pb-2">Our Services</h2>
              <p>At New Siddheswari Medical Distributors, we offer a wide range of services, including:</p>
              <ul className="list-disc ml-6">
                <li>Wholesale medicine distribution</li>
                <li>Timely delivery</li>
                <li>Personalized service</li>
              </ul>

              <h2 className="text-3xl font-bold text-amber-500 border-b-2 border-amber-500 pb-2">Company List</h2>
              <p>At New Siddheswari Medical Distributors, we collaborate with a variety of reputable pharmaceutical companies to ensure a diverse range of products. Our partners include:</p>
              <ul className="pl-20 pr-10 list-disc column columns-2">
                <li>Abbott India Ltd.</li>
                <li>Abbott Health Care</li>
                <li>Ajanta Pharma Ltd.</li>
                <li>Apex Laboratories</li>
                <li>Aristo Pharmaceuticals Pvt Ltd.</li>
                <li>Ballisa</li>
                <li>Corpus Life Science Pvt Ltd.</li>
                <li>DEYS MEDICAL</li>
                <li>Dr. Reddy's Laboratories</li>
                <li>Galderma</li>
                <li>Glenmark Pharmaceuticals</li>
                <li>Greenco Biological Pvt Ltd.</li>
                <li>Hegde & Hegde</li>
                <li>Intas Pharmaceuticals</li>
                <li>IPCA Laboratories</li>
                <li>JB Chemicals & Pharmaceuticals</li>
                <li>KLM Laboratories</li>
                <li>Knockworld Pharma</li>
                <li>Lupin Limited</li>
                <li>Lyceum Life Science</li>
                <li>Martin & Harris Pvt Ltd.</li>
                <li>Merck Specialities & Procter & Gamble Health Care Ltd.</li>
                <li>MSN Labs</li>
                <li>Mudi Mundi Pharma</li>
                <li>P.L Pharma</li>
                <li>RKG Pharma</li>
                <li>Shine Pharmaceuticals</li>
                <li>Strassenburg Pharmaceuticals</li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-500 border-b-2 border-amber-500 pb-2">Our Mission</h2>
              <p>Our mission is to ensure the availability of essential medicines to all who need them. We are dedicated to improving healthcare outcomes by providing safe, effective, and affordable pharmaceutical products. Our core values include integrity, customer satisfaction, and continuous improvement in all areas of our business.</p>

              <h2 className="text-2xl font-bold text-amber-500 border-b-2 border-amber-500 pb-2">Contact Us</h2>
              <div className="space-y-2">
                <p><i className="fas fa-map-marker-alt mr-2"></i><strong>Address:</strong> Kushpata, Ghatal, Paschim Medinipur, West Bengal</p>
                <p><i className="fas fa-phone-alt mr-2"></i><strong>Phone:</strong> +91 99331 52581</p>
                <p><i className="fab fa-whatsapp mr-2 text-xl"></i><strong>Whatsapp:</strong> +91 80163 27633</p>
                <p><i className="fas fa-envelope mr-2"></i><strong>Email:</strong> siddheswaritelecomghatal@gmail.com</p>
              </div>
            </Motion.article>
          )}

          {activeCompany === "gita" && (
              <Motion.article
                key="gita"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="space-y-6"
              >
              <img src="New Gita.jpg" alt="New Gita Enterprise" className="mx-auto rounded-2xl shadow max-w-sm"/>
              <h2 className="text-2xl font-bold text-green-600 border-b border-green-400 pb-2">About Us</h2>
              <p>
                New Gita Enterprise has established itself as a reliable supplier in the
                pharmaceutical industry, providing a wide range of high-quality medical
                products. Located in Ghatal, the company serves hospitals, pharmacies, and
                clinics, ensuring timely availability of essential medicines and healthcare
                supplies to meet patient needs.
              </p>
              <p>
                The enterprise is led by <strong>Susanta Adak</strong>, the proprietor of New
                Gita Enterprise, whose experience and practical knowledge of pharmaceutical
                distribution have been key to the company’s steady growth. His focus on
                quality, dependable service, and ethical business practices has helped build
                strong relationships with healthcare providers across the region.
              </p>
              <p>
                With a commitment to excellence and customer satisfaction, New Gita Enterprise
                continues to support the healthcare sector by maintaining consistent supply
                standards, reliable logistics, and professional service tailored to the needs
                of its clients.
              </p>
              
              <h2 className="text-2xl font-bold text-green-600 border-b border-green-400 pb-2">Founder</h2>
              <img src="Susanta Adak.jpg" alt="Founder" className="mx-auto rounded-lg shadow max-w-xs"/>
              <p>Founded by <strong>Susanta Adak</strong>, who brings a wealth of experience and a deep understanding of the pharmaceutical industry, New Gita Enterprise is guided by a vision to create a robust supply chain that connects manufacturers with healthcare providers seamlessly.</p>

              <h2 className="text-2xl font-bold text-green-600 border-b border-green-400 pb-2">Our Mission</h2>
              <p>Our mission is to empower healthcare providers by supplying them with essential medications and medical supplies. We strive to enhance healthcare delivery through reliable distribution channels, timely service, and a focus on quality.</p>

              <h2 className="text-2xl font-bold text-green-600 border-b border-green-400 pb-2">Company Lists</h2>
              <p>As a dedicated supplier, New Gita Enterprise offers:</p>
              <ul className="pl-20 pr-10 list-disc column columns-2">
                <li>Alkem Laboratories</li>
                <li>Apple Life Science</li>
                <li>Caplet India Pvt Ltd.</li>
                <li>Cipla Ltd.</li>
                <li>D.D Pharmaceuticals</li>
                <li>Emcure Pharmaceuticals</li>
                <li>Evangel PharmaceuticalsPvt Ltd.</li>
                <li>Geno Pharmaceuticals</li>
                <li>Glowderma Lab</li>
                <li>Griffin Biogenesis Pvt Ltd.</li>
                <li>GSK</li>
                <li>ICPA</li>
                <li>Karnataka Antibiotic Pvt Ltd. (KAPL)</li>
                <li>Macleods Pharmaceuticals</li>
                <li>Mankind Pharma Ltd (All Division)</li>
                <li>Meyer Organics</li>
                <li>Smart Laboratories</li>
                <li>Smartway Wellness</li>
                <li>Sun Pharma Distributors Limited (All Division)</li>
                <li>Sun Pharma Distributors (Ranbaxy)</li>
                <li>Sun Pharma Distributors Limited (OTC)</li>
                <li>Sundyota Numandis Pharmaceuticals</li>
                <li>USV</li>
                <li>Zuventus healthcare</li>
              </ul>

              <h2 className="text-2xl font-bold text-green-600 border-b border-green-400 pb-2">Quality Assurance</h2>
              <p>Quality is at the core of what we do. We meticulously source products from reputable manufacturers, ensuring they meet all safety and regulatory standards. Regular audits and quality checks allow us to maintain our high standards and provide our clients with the best.</p>
            
              <h2 className="text-2xl font-bold text-green-600 border-b border-green-400 pb-2">Contact Us</h2>
              <div className="space-y-2">
                <p><i className="fas fa-map-marker-alt mr-2"></i><strong>Address:</strong> Kushpata, Ghatal, Paschim Medinipur, 721212, West Bengal</p>
                <p><i className="fas fa-phone-alt mr-2"></i><strong>Phone:</strong> +91 80163 27633</p>
                <p><i className="fab fa-whatsapp mr-2"></i><strong>Whatsapp:</strong> +91 80163 27633</p>
                <p><i className="fas fa-envelope mr-2"></i><strong>Email:</strong> siddheswaritelecomghatal@gmail.com</p>
              </div>
            </Motion.article>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* FOOTER */}
      {activeCompany === "siddheswari" ? ( 
        <footer className="bg-amber-500/85 text-white text-center p-4 bottom-0 w-full">
          <p>@ {new Date().getFullYear()} New Siddheswari Distributors. All rights reserved.</p>
        </footer>
      ) : (
        <footer className="bg-green-500/85 text-white text-center p-4 bottom-0 w-full">
          <p>@ {new Date().getFullYear()} New Gita Enterprise. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
}
