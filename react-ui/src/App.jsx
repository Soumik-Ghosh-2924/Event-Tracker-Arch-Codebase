import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import './App.css';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        {/* Navbar stays fixed at top */}
        <header className="shadow-md bg-white sticky top-0 z-50">
          <Navbar />
        </header>

        {/* Main content area */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>

        {/* Footer (optional) */}
        <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600 border-t">
          © {new Date().getFullYear()} Event Tracker Shop. All rights reserved.
        </footer>
      </div>
    </CartProvider>
  );
}
