import React, { useState } from "react";
import { Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    if (password === "123") {
      setIsLoggedIn(true);
      setPassword("");
      navigate("/dashboard");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-96">
        <div className="text-center mb-6">
          {/* <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="text-blue-600 w-8 h-8" />
          </div> */}
          <h1 className="text-2xl font-bold text-gray-800">City POS</h1>
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
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Enter password"
            />
            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-3 mb-4 select-none">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 text-xl font-bold py-3 rounded-lg shadow"
                  onClick={() => setPassword(password + num)}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg shadow"
                onClick={() => setPassword("")}
              >
                Clear
              </button>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-xl font-bold py-3 rounded-lg shadow"
                onClick={() => setPassword(password + "0")}
              >
                0
              </button>
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg shadow"
                onClick={() => setPassword(password.slice(0, -1))}
              >
                ←
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Login
          </button>
        </div>
        {/* <p className="text-xs text-gray-500 text-center mt-4">
          Demo password: admin123
        </p> */}
      </div>
    </div>
  );
};

export default Login;
