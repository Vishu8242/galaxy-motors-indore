import React, { useState } from "react";
import logo from "./image/Logo.jpeg"; // path check kar lena

function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "rgba(0,0,0,0.95)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">

        {/* TOP BAR */}
        <div className="flex items-center justify-between">

          {/* ✅ LOGO + BRAND NAME */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Galaxy Motors"
              className="h-10 sm:h-12 md:h-14 object-contain rounded-lg"
            />

            <span
              className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-wide"
              style={{ color: "#ffffff" }}
            >
              GALAXY <span style={{ color: "#e11d48" }}>MOTORS</span>
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white font-semibold hover:text-red-500 transition"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("inventory")}
              className="text-white font-semibold hover:text-red-500 transition"
            >
              Inventory
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="text-white font-semibold hover:text-red-500 transition"
            >
              About
            </button>


            <button
              onClick={() => scrollToSection("contact")}
              className="text-white font-semibold hover:text-red-500 transition"
            >
              Contact
            </button>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-3xl"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <div className="bg-black rounded-xl p-4 space-y-4">
            <button onClick={() => scrollToSection("home")} className="block w-full text-left text-white text-lg">
              Home
            </button>
            <button onClick={() => scrollToSection("inventory")} className="block w-full text-left text-white text-lg">
              Inventory
            </button>
           
             <button onClick={() => scrollToSection("about")} className="block w-full text-left text-white text-lg">
              About
            </button>
            <button onClick={() => scrollToSection("contact")} className="block w-full text-left text-white text-lg">
              Contact
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
