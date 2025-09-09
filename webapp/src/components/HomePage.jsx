import React, { useState } from "react";

const ImprovedProductGrid = () => {
  // Sample data for demonstration
  const sampleProducts = [
    {
      id: 1,
      name: "Dell XPS 13 | Core i5 10th Gen | 16GB RAM | 512GB SSD | Windows 11",
      price: 1299.99,
      image: "💻",
    },
    {
      id: 2,
      name: "MacBook Pro 14-inch | M2 Pro Chip | 32GB RAM | 1TB SSD",
      price: 2499.99,
      image: "💻",
    },
    {
      id: 3,
      name: "Samsung Galaxy S24 Ultra | 256GB | 5G | Titanium Gray",
      price: 1199.99,
      image: "📱",
    },
    {
      id: 4,
      name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      price: 399.99,
      image: "🎧",
    },
    {
      id: 5,
      name: "iPad Pro 12.9-inch | M2 Chip | 128GB | Wi-Fi + Cellular",
      price: 1099.99,
      image: "📱",
    },
    {
      id: 6,
      name: "Gaming PC | RTX 4080 | Intel i7-13700K | 32GB DDR5 | 1TB NVMe SSD",
      price: 2899.99,
      image: "🖥️",
    },
  ];

  const [cart, setCart] = useState([]);
  const [searchTerm] = useState("");

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`Added ${product.name} to cart!`);
  };

  // For demo purposes, we'll use sampleProducts as both filtered and frequent
  const filteredProducts = sampleProducts;
  const frequentlyBought = sampleProducts;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Electronics POS - Product Grid
      </h1>

      {/* Improved Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {(searchTerm ? filteredProducts : frequentlyBought).map((product) => (
          <button
            key={product.id}
            onClick={() => addToCart(product)}
            title={product.name} // Tooltip for full name
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-gray-200 group flex flex-col h-full"
          >
            {/* Image/Icon Section */}
            <div className="flex-shrink-0 text-center mb-3">
              <div className="text-3xl group-hover:scale-110 transition-transform">
                {product.image}
              </div>
            </div>

            {/* Product Name - Flexible Height */}
            <div className="flex-1 flex items-start justify-center mb-3 min-h-[3rem]">
              <h3 className="font-medium text-gray-800 text-xs leading-relaxed text-center line-clamp-4 px-1">
                {product.name}
              </h3>
            </div>

            {/* Price Section - Always at Bottom */}
            <div className="flex-shrink-0">
              <div className="bg-green-100 text-green-800 py-2 px-3 rounded-lg font-bold text-sm text-center">
                ${product.price.toFixed(2)}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
        <p className="text-gray-600">{cart.length} items in cart</p>
      </div>

      {/* CSS for line-clamp */}
      <style jsx>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ImprovedProductGrid;
