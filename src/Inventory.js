import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function Inventory() {
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // better for 3-grid

  /* 🔥 FETCH CARS */
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const q = query(collection(db, "cars"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCars(list);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  /* 🔍 SEARCH */
  const filteredCars = cars.filter(car => {
    const t = search.toLowerCase();
    return (
      car.name?.toLowerCase().includes(t) ||
      car.brand?.toLowerCase().includes(t) ||
      car.variant?.toLowerCase().includes(t)
    );
  });

  const visibleCars = filteredCars.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading cars...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-10">

      {/* TITLE */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        Cars for Sale
      </h1>

      {/* SEARCH */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by brand, model or variant..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(6);
          }}
          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black"
        />
      </div>

      {/* GRID: 1 (mobile) · 2 (tablet) · 3 (desktop) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCars.length === 0 && (
          <p className="col-span-full text-center text-gray-500 text-xl">
            No cars found
          </p>
        )}

        {visibleCars.map(car => (
          <div
            key={car.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* IMAGE (TOP · FULL IMAGE · NO CUT) */}
            <div className="w-full h-40 bg-white border border-black rounded-t-xl flex items-center justify-center">
              <img
                src={car.images?.[0]}
                alt={car.name}
                className="max-w-full max-h-full object-contain
                           transition-transform duration-300
                           hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">
              {/* PRICE */}
              <p className="text-xl font-bold text-green-600">
                ₹{Number(car.price).toLocaleString()}
              </p>

              {/* NAME */}
              <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                {car.name}
              </h2>

              {/* BRAND + VARIANT */}
              <p className="text-sm text-gray-600">
                {car.brand} • {car.variant}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {car.year}
                </span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {car.fuel}
                </span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {car.gear}
                </span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {Number(car.km).toLocaleString()} km
                </span>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => navigate("/car", { state: { car } })}
                className="mt-4 w-full bg-black text-white py-2.5 rounded-lg
                           font-semibold hover:bg-gray-800 transition"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SHOW MORE */}
      {visibleCount < filteredCars.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount(v => v + 6)}
            className="bg-black text-white px-10 py-3 rounded-xl
                       font-semibold hover:bg-gray-800 transition"
          >
            Show More Cars
          </button>
        </div>
      )}
    </div>
  );
}

export default Inventory;
