import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import First from "./First";
import CarView from "./CarView";
import AdminLogin from "./AdmianLogin";
import Admin from "./Admin";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./Footer";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<First />} />

        <Route path="/car" element={<CarView />} />

        {/* PUBLIC */}
        <Route path="/" element={<First />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* 🔐 PROTECTED */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
