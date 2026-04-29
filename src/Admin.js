import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";

import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";



const IMG_BB_API_KEY = process.env.REACT_APP_IMGBB_API_KEY;

function Admin() {
  const navigate = useNavigate();

  /* 🔐 ADMIN PROTECTION */
  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  /* FORM STATE */
  const [form, setForm] = useState({
    name: "",
    brand: "",
    variant: "",
    year: "",
    price: "",
    fuel: "",
    km: "",
    gear: "",
  });

  /* IMAGE STATE – 12 */
  const [images, setImages] = useState(Array(12).fill(null));
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  /* DATA */
  const [cars, setCars] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [, setLoadingCars] = useState(true);
  const [, setLoadingContacts] = useState(true);

  /* FETCH CARS */
  useEffect(() => {
    const fetchCars = async () => {
      const q = query(collection(db, "cars"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setCars(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoadingCars(false);
    };
    fetchCars();
  }, []);

  /* FETCH CONTACTS */
  useEffect(() => {
    const fetchContacts = async () => {
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setContacts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoadingContacts(false);
    };
    fetchContacts();
  }, []);

  /* IMAGE HANDLER */
  const handleImageChange = (index, file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setStatus("❌ Image must be under 5MB");
      return;
    }
    const arr = [...images];
    arr[index] = file;
    setImages(arr);
  };

  /* IMG BB UPLOAD */
  const uploadToImgBB = async (file) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
      { method: "POST", body: fd }
    );

    const data = await res.json();
    if (!data.success) throw new Error("Upload failed");
    return data.data.url;
  };

  /* ADD CAR */
  const handleAddCar = async (e) => {
    e.preventDefault();

    if (images.some(img => img === null)) {
      setStatus("❌ Upload all 12 images");
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      const urls = await Promise.all(images.map(img => uploadToImgBB(img)));

      const docRef = await addDoc(collection(db, "cars"), {
        ...form,
        year: Number(form.year),
        price: Number(form.price),
        km: Number(form.km),
        images: urls,
        createdAt: Timestamp.now(),
      });

      setCars(prev => [{ id: docRef.id, ...form, images: urls }, ...prev]);

      setForm({
        name: "",
        brand: "",
        variant: "",
        year: "",
        price: "",
        fuel: "",
        km: "",
        gear: "",
      });

      setImages(Array(12).fill(null));
      setStatus("✅ Car added successfully");
    } catch (err) {
      setStatus("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* DELETE CAR */
  const deleteCar = async (id) => {
    if (!window.confirm("Delete this car?")) return;
    await deleteDoc(doc(db, "cars", id));
    setCars(prev => prev.filter(c => c.id !== id));
  };

  /* DASHBOARD STATS */
  const totalCars = cars.length;
  const totalImages = cars.length * 12;
  const totalContacts = contacts.length;
  // const highestPrice =
  //   cars.length > 0 ? Math.max(...cars.map(c => Number(c.price))) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 md:px-10 pt-24 pb-14">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Admin Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-2 rounded-xl font-semibold shadow"
        >
          Logout
        </button>
      </div>

      {/* DASHBOARD CARDS */}
     <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-14">

  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-2xl shadow hover:scale-105 transition">
    <p className="text-sm opacity-80">Total Cars</p>
    <h2 className="text-4xl font-bold mt-2">{totalCars}</h2>
  </div>

  <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-2xl shadow hover:scale-105 transition">
    <p className="text-sm opacity-80">Total Images</p>
    <h2 className="text-4xl font-bold mt-2">{totalImages}</h2>
  </div>

  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl shadow hover:scale-105 transition">
    <p className="text-sm opacity-80">Contacts</p>
    <h2 className="text-4xl font-bold mt-2">{totalContacts}</h2>
  </div>

</div>



      {/* ADD CAR */}
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl mx-auto p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">➕ Add New Car</h2>

        {status && (
          <div className="mb-5 p-3 rounded-xl bg-gray-100 text-center font-semibold">
            {status}
          </div>
        )}

        <form onSubmit={handleAddCar} className="grid sm:grid-cols-2 gap-5">
          {["name","brand","variant","year","price","fuel","km"].map((f,i)=>(
            <input
              key={i}
              placeholder={f.toUpperCase()}
              type={["year","price","km"].includes(f) ? "number" : "text"}
              required
              value={form[f]}
              onChange={e=>setForm({...form,[f]:e.target.value})}
              className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          ))}

          <select
            required
            value={form.gear}
            onChange={e => setForm({ ...form, gear: e.target.value })}
            className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">SELECT GEAR</option>
            <option>Manual</option>
            <option>Automatic</option>
            <option>AMT</option>
            <option>CVT</option>
            <option>DSG</option>
          </select>

          {/* IMAGE GRID */}
          <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img,i)=>(
              <label
                key={i}
                className="border-2 border-dashed h-32 rounded-xl flex items-center justify-center cursor-pointer hover:border-indigo-500 transition bg-gray-50"
              >
                {img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-full object-cover rounded-xl"
                    alt=""
                  />
                ) : (
                  <span className="text-gray-400 font-semibold">
                    + Image {i+1}
                  </span>
                )}
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={e=>handleImageChange(i,e.target.files[0])}
                />
              </label>
            ))}
          </div>

          <button
            disabled={loading}
            className="sm:col-span-2 bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl font-bold shadow-lg"
          >
            {loading ? "Uploading..." : "Add Car"}
          </button>
        </form>
      </div>

      {/* ALL CARS */}
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl mx-auto p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">
          🚗 All Cars ({cars.length})
        </h2>

        {cars.map(car => (
          <div
            key={car.id}
            className="flex justify-between items-center border-b py-4 hover:bg-gray-50 px-2 rounded-lg transition"
          >
            <div>
              <p className="font-semibold text-lg">{car.name}</p>
              <p className="text-sm text-gray-500">
                {car.brand} • {car.year} • {car.gear}
              </p>
              <p className="text-emerald-600 font-bold">
                ₹{Number(car.price).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => deleteCar(car.id)}
              className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-xl"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* CONTACTS */}
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">
          📩 Contact Messages ({contacts.length})
        </h2>

        {contacts.map(msg => (
          <div key={msg.id} className="border rounded-xl p-4 mb-4 bg-gray-50">
            <p className="font-semibold text-lg">{msg.name}</p>
            <p className="text-sm">📞 {msg.phone}</p>
            {msg.email && <p className="text-sm">✉️ {msg.email}</p>}
            <p className="mt-2 text-gray-700">{msg.message}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Admin;
