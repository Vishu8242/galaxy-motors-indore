import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 py-10">

      <div className="max-w-5xl mx-auto space-y-10">

        {/* TITLE */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            About <span className="text-red-600">Galaxy Motors</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Drive Your Dreams with Confidence ✨
          </p>
        </div>

        {/* SECTION 1 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            A trusted dealership offering well-maintained new & pre-owned cars, backed by verified company records and complete transparency.
            Every vehicle is carefully checked — because you deserve nothing but the best.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To make car buying simple, stress-free, and exciting.
            From choosing the right car to financing and paperwork — we’re with you at every step 🤝
          </p>
        </div>

        {/* SECTION 3 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-gray-600">
            <li>✔ 100% Verified & Inspected Cars</li>
            <li>✔ Non-Accidental Vehicles Only </li>
            <li>✔ Transparent Pricing  No Hidden Costs</li>
            <li>✔ Finance Available from Top Banks
              (HDFC • ICICI • IDFC • Kotak) </li>
            <li>✔ Proper Company Records & Documentation</li>
            <li>✔ 150+ Cars Ready for You  </li>
            <li>✔ Easy & Hassle-Free Paperwork</li>
            <li>✔ Friendly & Well-Trained Staff</li>
            <li>✔ Complete After-Sales Support </li>
            
          </ul>
        </div>

        {/* SECTION 4 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-3">Our Experience</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-600">28+</p>
              <p className="text-gray-600">Years</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">5000+</p>
              <p className="text-gray-600">Cars Sold</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">4500+</p>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">100%</p>
              <p className="text-gray-600">Trusted Deals</p>
            </div>
          </div>
        </div>

        {/* CONTACT */}


      </div>
    </div>
  );
}

export default About;
