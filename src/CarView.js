import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CarView() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Car data coming from Inventory/Admin
  const car = location.state?.car || null;

  // 🔹 Fallback contact
  const contact = car?.contact || {
    sellerName: "Galaxy Motors",
    phone: "9691516866",
    email: "galaxymotors.1999@email.com",
    city: "Indore",
  };

  // 🔹 Main image state (UPDATED FIX)
  const [mainImage, setMainImage] = useState("");

  // ✅ FIX: Update image when car changes
  useEffect(() => {
    if (car?.images?.length > 0) {
      setMainImage(car.images[0]);
    }
  }, [car]);

  // ❌ If no car data
  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl mb-4">No car data found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-24 pb-12">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 font-semibold mb-4"
      >
        ← Back
      </button>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg
                      grid grid-cols-1 md:grid-cols-2 gap-6 p-5">

        {/* 🖼 IMAGE SECTION */}
        <div>
          {/* MAIN IMAGE */}
          <div className="w-full h-72 sm:h-96 bg-white border border-black rounded-xl
                          flex items-center justify-center overflow-hidden">
            {mainImage && (
              <img
                src={mainImage}
                alt={car.name}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {car.images?.map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 bg-white border rounded-lg
                            flex items-center justify-center cursor-pointer
                            ${mainImage === img
                              ? "border-black"
                              : "border-gray-300"}`}
              >
                <img
                  src={img}
                  alt={`car-${index}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 📄 DETAILS SECTION */}
        <div className="flex flex-col justify-between">

          <div>
            <h1 className="text-3xl font-bold">{car.name}</h1>

            <p className="text-gray-500 mt-1">
              {car.brand} • {car.variant} • {car.year}
            </p>

            <p className="text-3xl font-bold text-green-600 mt-4">
              ₹{Number(car.price).toLocaleString()}
            </p>

            {/* DETAILS */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-base">
              <p><b>Fuel:</b> {car.fuel}</p>
              <p><b>Gear:</b> {car.gear}</p>
              <p><b>KM Driven:</b> {Number(car.km).toLocaleString()}</p>
            </div>
          </div>

          {/* 📞 CONTACT SELLER */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-lg mb-2">
              Contact Seller
            </h3>

            <p><b>Name:</b> {contact.sellerName}</p>
            <p><b>Phone:</b> {contact.phone}</p>
            <p><b>Email:</b> {contact.email}</p>
            <p><b>City:</b> {contact.city}</p>

            {/* BUTTONS */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${contact.phone}`}
                className="text-center bg-green-600 text-white py-3 rounded-lg font-semibold"
              >
                Call
              </a>

              <a
                href={`https://wa.me/91${contact.phone}`}
                target="_blank"
                rel="noreferrer"
                className="text-center bg-emerald-500 text-white py-3 rounded-lg font-semibold"
              >
                WhatsApp
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="text-center bg-red-600 text-white py-3 rounded-lg font-semibold"
              >
                Gmail
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CarView;
