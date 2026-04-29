import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Footer() {

  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const handleHiddenClick = () => {
    setCount(prev => {
      const next = prev + 1;

      // 🔐 5 clicks required
      if (next === 5) {
        navigate("/admin-login");
        return 0; // reset
      }
      return next;
    });
  }
    return (
      <footer className="bg-black text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

          {/* TOP FOOTER */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {/* BRAND */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">
                GALAXY <span className="text-red-600">MOTORS</span>
              </h2>
              <p className="text-sm leading-relaxed">
                Trusted car dealership providing quality new and used cars
                with honest pricing and complete customer support..
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="hover:text-red-500">Home</a></li>
                <li><a href="#inventory" className="hover:text-red-500">Inventory</a></li>
                <li><a href="#about" className="hover:text-red-500">About</a></li>
                <li><a href="#contact" className="hover:text-red-500">Contact</a></li>
              </ul>
            </div>

            {/* CONTACT INFO */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Contact Us
              </h3>
              <ul className="space-y-2 text-sm">
                <li>📍17,Gulmarg Complex,Sapna Sangeetha Road, near inox (opposite rajpal honda) Indore, Madhya Pradesh</li>
                <li>📞 +91 9691516866</li>
                <li>✉️ galaxymotors.1999@gmail.com</li>
              </ul>
            </div>

            {/* BUSINESS HOURS */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Business Hours
              </h3>
              <ul className="space-y-2 text-sm">
                <li>Mon – Sat: 10:30 AM – 7:30 PM</li>
                <li>All days open.</li>
                <li>365 days available</li>
              </ul>
            </div>

          </div>

          {/* DIVIDER */}
          <div
            className="border-t border-gray-700 mt-8 pt-4 text-center text-sm
                 select-none cursor-default"
            onClick={handleHiddenClick}
          >
            © {new Date().getFullYear()} Galaxy Motors. All rights reserved.
          </div>

        </div>
      </footer>
    );
  }

  export default Footer;
