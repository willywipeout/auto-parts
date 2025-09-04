import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  DollarSign,
  LogOut,
  Package,
  Smartphone,
  Gamepad2,
  Headphones,
  Monitor,
  Tablet,
  Camera,
  Watch,
  Calculator,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";

const ElectronicsPOS = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [currentSale, setCurrentSale] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shift, setShift] = useState({ started: false, sales: 0, total: 0 });

  // Sample products for electronics store
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 999.99,
      category: "phone",
      icon: Smartphone,
      frequent: true,
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 899.99,
      category: "phone",
      icon: Smartphone,
      frequent: true,
    },
    {
      id: 3,
      name: "PlayStation 5",
      price: 499.99,
      category: "console",
      icon: Gamepad2,
      frequent: true,
    },
    {
      id: 4,
      name: "Xbox Series X",
      price: 449.99,
      category: "console",
      icon: Gamepad2,
      frequent: true,
    },
    {
      id: 5,
      name: "AirPods Pro",
      price: 249.99,
      category: "accessory",
      icon: Headphones,
      frequent: true,
    },
    {
      id: 6,
      name: "MacBook Air M3",
      price: 1199.99,
      category: "laptop",
      icon: Monitor,
      frequent: false,
    },
    {
      id: 7,
      name: "iPad Pro",
      price: 799.99,
      category: "tablet",
      icon: Tablet,
      frequent: true,
    },
    {
      id: 8,
      name: "Nintendo Switch OLED",
      price: 349.99,
      category: "console",
      icon: Gamepad2,
      frequent: true,
    },
    {
      id: 9,
      name: "Sony WH-1000XM5",
      price: 349.99,
      category: "accessory",
      icon: Headphones,
      frequent: false,
    },
    {
      id: 10,
      name: "Canon EOS R6",
      price: 2499.99,
      category: "camera",
      icon: Camera,
      frequent: false,
    },
    {
      id: 11,
      name: "Apple Watch Series 9",
      price: 399.99,
      category: "accessory",
      icon: Watch,
      frequent: true,
    },
    {
      id: 12,
      name: "Dell XPS 15",
      price: 1599.99,
      category: "laptop",
      icon: Monitor,
      frequent: false,
    },
    {
      id: 13,
      name: "iPhone Charger",
      price: 29.99,
      category: "accessory",
      icon: Smartphone,
      frequent: true,
    },
    {
      id: 14,
      name: "Gaming Headset",
      price: 129.99,
      category: "accessory",
      icon: Headphones,
      frequent: true,
    },
    {
      id: 15,
      name: "Phone Case",
      price: 19.99,
      category: "accessory",
      icon: Smartphone,
      frequent: true,
    },
  ];

  const frequentProducts = products.filter((p) => p.frequent);

  const handleLogin = (e) => {
    if (password === "admin123") {
      setIsLoggedIn(true);
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  const addToSale = (product) => {
    const existingItem = currentSale.find((item) => item.id === product.id);
    if (existingItem) {
      setCurrentSale(
        currentSale.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCurrentSale([...currentSale, { ...product, quantity: 1 }]);
    }
  };

  const removeFromSale = (productId) => {
    setCurrentSale(currentSale.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCurrentSale(
      currentSale
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const calculateTotal = () => {
    return currentSale.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const completeSale = () => {
    if (currentSale.length === 0) return;

    const saleTotal = calculateTotal();
    setShift((prev) => ({
      ...prev,
      sales: prev.sales + 1,
      total: prev.total + saleTotal,
    }));
    setCurrentSale([]);
    alert(`Sale completed! Total: $${saleTotal.toFixed(2)}`);
  };

  const openDrawer = () => {
    setDrawerOpen(true);
    setTimeout(() => setDrawerOpen(false), 2000);
    alert("Cash drawer opened");
  };

  const endShift = () => {
    if (
      window.confirm(
        `End shift? Total sales: ${
          shift.sales
        }, Total amount: $${shift.total.toFixed(2)}`
      )
    ) {
      setShift({ started: false, sales: 0, total: 0 });
      setCurrentSale([]);
    }
  };

  const startShift = () => {
    setShift({ started: true, sales: 0, total: 0 });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-96">
          <div className="text-center mb-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="text-blue-600 w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              ElectroStore POS
            </h1>
            <p className="text-gray-600">Point of Sale System</p>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin(e)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              Login
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            Demo password: admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Smartphone className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                ElectroStore POS
              </h1>
              <p className="text-sm text-gray-600">
                {shift.started
                  ? `Shift Active | Sales: ${
                      shift.sales
                    } | Total: $${shift.total.toFixed(2)}`
                  : "No Active Shift"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!shift.started ? (
              <button
                onClick={startShift}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Start Shift
              </button>
            ) : (
              <>
                <button
                  onClick={openDrawer}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-2"
                >
                  <Package className="w-4 h-4" />
                  <span>Open Drawer</span>
                </button>
                <button
                  onClick={endShift}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  End Shift
                </button>
              </>
            )}
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition duration-200"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar - Search and Quick Actions */}
        <div className="w-80 bg-white shadow-md p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setCurrentSale([])}
              disabled={!shift.started}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>New Sale</span>
            </button>
          </div>

          {/* Current Sale */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Current Sale
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {currentSale.length === 0 ? (
                <p className="text-gray-500 text-sm">No items in cart</p>
              ) : (
                currentSale.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-2 rounded border flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-600">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 p-1 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-green-100 hover:bg-green-200 text-green-600 p-1 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromSale(item.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 p-1 rounded"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {currentSale.length > 0 && (
              <div className="mt-4 pt-3 border-t">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-lg">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={completeSale}
                  disabled={!shift.started}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Complete Sale</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {searchTerm ? (
            /* Search Results */
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Search Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => {
                  const IconComponent = product.icon;
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
                    >
                      <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                        <IconComponent className="text-blue-600 w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-2xl font-bold text-blue-600 mb-3">
                        ${product.price}
                      </p>
                      <button
                        onClick={() => addToSale(product)}
                        disabled={!shift.started}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                      >
                        Add to Cart
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Frequently Bought Products */
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Frequently Bought
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {frequentProducts.map((product) => {
                  const IconComponent = product.icon;
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                    >
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="text-white w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2 text-lg">
                        {product.name}
                      </h3>
                      <p className="text-3xl font-bold text-blue-600 mb-4">
                        ${product.price}
                      </p>
                      <button
                        onClick={() => addToSale(product)}
                        disabled={!shift.started}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Quick Categories */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Quick Categories
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-200 cursor-pointer">
                    <Smartphone className="text-blue-600 w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold text-gray-800">Phones</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-200 cursor-pointer">
                    <Gamepad2 className="text-green-600 w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold text-gray-800">Consoles</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-200 cursor-pointer">
                    <Headphones className="text-purple-600 w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold text-gray-800">Audio</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-200 cursor-pointer">
                    <Monitor className="text-orange-600 w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold text-gray-800">Computers</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drawer Status */}
      {drawerOpen && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Cash drawer opened
        </div>
      )}

      {/* Shift Status Warning */}
      {!shift.started && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg shadow-lg">
          Start your shift to begin processing sales
        </div>
      )}
    </div>
  );
};

export default ElectronicsPOS;
