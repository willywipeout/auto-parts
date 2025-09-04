import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  DollarSign,
  LogOut,
  Plus,
  Minus,
  Trash2,
  Menu,
} from "lucide-react";

const POSInterface = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSale, setCurrentSale] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sample frequently bought products
  const frequentlyBought = [
    { id: 1, name: "Coffee", price: 3.5, image: "☕" },
    { id: 2, name: "Sandwich", price: 8.99, image: "🥪" },
    { id: 3, name: "Water Bottle", price: 1.99, image: "💧" },
    { id: 4, name: "Energy Drink", price: 2.75, image: "⚡" },
    { id: 5, name: "Chips", price: 1.5, image: "🍟" },
    { id: 6, name: "Candy Bar", price: 1.25, image: "🍫" },
    { id: 7, name: "Muffin", price: 4.5, image: "🧁" },
    { id: 8, name: "Juice", price: 3.25, image: "🧃" },
  ];

  const allProducts = [
    ...frequentlyBought,
    { id: 9, name: "Pizza Slice", price: 5.99, image: "🍕" },
    { id: 10, name: "Salad", price: 7.5, image: "🥗" },
    { id: 11, name: "Hot Dog", price: 4.25, image: "🌭" },
    { id: 12, name: "Burger", price: 9.99, image: "🍔" },
  ];

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleNewSale = () => {
    setCart([]);
    setCurrentSale(true);
    setSearchTerm("");
  };

  const handleOpenDrawer = () => {
    alert("Cash drawer opened!");
  };

  const handleEndShift = () => {
    if (window.confirm("Are you sure you want to end your shift?")) {
      alert("Shift ended. Thank you!");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`Sale completed! Total: $${getCartTotal().toFixed(2)}`);
    handleNewSale();
  };

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-80 bg-white shadow-lg flex flex-col">
        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Cart */}
        <div className="flex-1 overflow-auto p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Current Sale</h3>
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <ShoppingCart size={48} className="mx-auto mb-2 text-gray-300" />
              <p>No items in cart</p>
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{item.name}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-bold text-green-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Total & Checkout */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-green-600">
              ${getCartTotal().toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 px-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-colors"
          >
            <DollarSign size={24} />
            Complete Sale
          </button>
        </div>
      </div>

      {/* Main Product Area */}
      <div className="flex-1 p-6">
        <div className="mb-6 flex border-b border-gray-200 justify-end">
          <button
            onClick={() => setDrawerOpen(true)}
            className="focus:outline-none hover:bg-gray-100 rounded-full p-2 transition"
            aria-label="Open menu"
          >
            <Menu size={30} />
          </button>
        </div>

        {/* Right Drawer Overlay */}
        {drawerOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300"
              onClick={() => setDrawerOpen(false)}
            ></div>
            {/* Drawer */}
            <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform translate-x-0 transition-transform duration-300 flex flex-col">
              <div className="flex items-center justify-between p-5 border-b">
                <h2 className="text-xl font-bold text-blue-700">QuickPOS</h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-gray-500 hover:text-gray-800 focus:outline-none"
                  aria-label="Close menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 p-5 flex flex-col gap-4">
                <button
                  onClick={() => {
                    handleNewSale();
                    setDrawerOpen(false);
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow"
                >
                  <Plus size={20} />
                  New Sale
                </button>
                <button
                  onClick={() => {
                    handleOpenDrawer();
                    setDrawerOpen(false);
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow"
                >
                  <Plus size={20} />
                  Open Drawer
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      handleEndShift();
                      setDrawerOpen(false);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-1 transition-colors shadow"
                  >
                    <LogOut size={16} />
                    End Shift
                  </button>
                </div>
                <button
                  onClick={() => {
                    handleNewSale();
                    setDrawerOpen(false);
                  }}
                  button
                  className="fixed bottom-4 flex left-1/2 -translate-x-1/2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl shadow-lg"
                >
                  <LogOut size={20} className="mr-2" />
                  Back Office
                </button>
              </div>
            </div>
          </>
        )}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {searchTerm ? "Search Results" : "Frequently Bought Items"}
          </h2>
          <p className="text-gray-600">
            {searchTerm
              ? `Showing results for "${searchTerm}"`
              : "Quick access to popular products"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {(searchTerm ? filteredProducts : frequentlyBought).map((product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-gray-200 group"
            >
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {product.image}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                  {product.name}
                </h3>
                <div className="bg-green-100 text-green-800 py-2 px-3 rounded-lg font-bold">
                  ${product.price.toFixed(2)}
                </div>
              </div>
            </button>
          ))}
        </div>

        {searchTerm && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">
              No products found matching "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Status Bar */}
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">System Online</span>
            </div>
            <div className="text-gray-400">|</div>
            <div className="text-gray-600">
              Items in cart:{" "}
              <span className="font-semibold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSInterface;
