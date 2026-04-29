import React from "react";

function Hero() {

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      id="home"
      className="w-full min-h-screen overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* HERO SECTION */}
      <section
        className="min-h-screen flex items-center justify-center px-6 pt-20"
        style={{
          background:
            "linear-gradient(135deg, var(--background) 0%, #1a1a2e 100%)",
        }}
      >
        <div className="text-center max-w-3xl">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ color: "var(--text)" }}
          >
            Find Your <span className="gradient-text">Dream Car</span>
          </h1>

          <p
            className="text-xl mb-8"
            style={{ color: "rgba(245,245,247,0.7)" }}
          >
            Luxury vehicles at competitive prices.
          </p>

          {/* 🔥 ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Browse Collection → Inventory */}
            <button
              onClick={() => scrollToSection("inventory")}
              className="px-8 py-4 rounded-full font-semibold text-lg"
              style={{
                background: "var(--primary-action)",
                color: "white",
              }}
            >
              Browse Collection
            </button>

            {/* Book Test Drive → Contact / Sell Your Car */}
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 rounded-full font-semibold text-lg border-2"
              style={{
                borderColor: "var(--text)",
                color: "var(--text)",
              }}
            >
              Sell Your Car
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
