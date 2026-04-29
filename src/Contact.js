import React, { useEffect, useRef, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/* 🔥 SLIDE HOOK */
function useSlideIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [titleRef, titleVisible] = useSlideIn();
  const [formRef, formVisible] = useSlideIn();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setStatus("");

      await addDoc(collection(db, "contacts"), {
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: form.message,
        createdAt: serverTimestamp(),
      });

      setStatus("✅ Message sent successfully!");
      setForm({ name: "", phone: "", email: "", message: "" });

    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* TITLE */}
        <div
          ref={titleRef}
          className={`text-center transition-all duration-700
          ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-3xl sm:text-4xl font-bold">
            Contact <span className="text-red-600">Galaxy Motors</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Get in touch for car details, pricing, or test drive
          </p>
        </div>

        {/* FORM */}
        <div
          ref={formRef}
          className={`bg-white rounded-xl shadow p-6 sm:p-8 transition-all duration-700 delay-100
          ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {status && (
            <div className="mb-4 text-center font-semibold">
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="name"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
            />

            <input
              name="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Your message..."
              value={form.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
            />

            <button
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;
