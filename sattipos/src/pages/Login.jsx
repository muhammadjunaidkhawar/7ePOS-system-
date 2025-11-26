import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid username or password!");
      }
    } catch (err) {
      setError("Server not responding!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000]">
      <h1 className="text-3xl font-semibold mb-6 text-[#FF9500] text-center">
        7E POS
      </h1>

      <div className="w-full max-w-md p-8 bg-[#2a2a2a] rounded-3xl shadow-lg text-center">
        <h1 className="text-2xl mb-6 text-[#ffffff]">Login!</h1>
        <p className="text-sm text-white mb-6">
          Please enter your credentials below to continue
        </p>

        <div className="mb-4 text-left">
          <label className="block text-sm text-gray-300 mb-2">Username</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-[#FF9500]">
              <i className="fa-solid fa-user"></i>
            </span>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 placeholder:text-xs rounded-md bg-[#3a3a3a] text-white focus:outline-none focus:ring-2 focus:ring-[#FF9500]"
            />
          </div>
        </div>

        <div className="mb-4 text-left">
          <label className="block text-sm text-gray-300 mb-2">Password</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-[#FF9500]">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 placeholder:text-xs rounded-md bg-[#3a3a3a] text-white focus:outline-none focus:ring-2 focus:ring-[#FF9500]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-[#FF9500] hover:text-white"
            >
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="flex items-center justify-between text-sm mb-6">
          <label className="flex items-center text-xs text-gray-300">
            <input type="checkbox" className="mr-2 w-3 h-3 accent-[#FF9500]" />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-[#FF9500] text-xs hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          className="w-[120px] h-[40px] py-2 rounded-md bg-[#FF9500] hover:bg-[#e68806] text-black text-xs"
        >
          Login
        </button>
      </div>
    </div>
  );
}
