import { useState } from "react";

import { Link, useNavigate } from "react-router-dom"; //  Added useNavigate
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Monthly");
  const navigate = useNavigate(); // ✅ Initialize navigation

  const chartData = [
    { name: "Jan", sales: 2000, revenue: 2400 },
    { name: "Feb", sales: 2200, revenue: 2600 },
    { name: "Mar", sales: 1800, revenue: 2100 },
    { name: "Apr", sales: 2500, revenue: 2800 },
    { name: "May", sales: 2700, revenue: 3000 },
    { name: "Jun", sales: 2400, revenue: 2900 },
    { name: "Jul", sales: 3000, revenue: 3500 },
    { name: "Aug", sales: 2800, revenue: 3100 },
    { name: "Sep", sales: 2600, revenue: 3000 },
    { name: "Oct", sales: 2900, revenue: 3400 },
    { name: "Nov", sales: 3100, revenue: 3600 },
    { name: "Dec", sales: 3300, revenue: 4000 },
  ];

  const dishes = [
    { name: "Chicken Parmesan", price: 50, status: "In Stock" },
    { name: "Spaghetti Carbonara", price: 55, status: "Out of Stock" },
    { name: "Grilled Salmon", price: 52, status: "In Stock" },
    { name: "Caesar Salad", price: 50, status: "In Stock" },
  ];

  //  Logout handler
  const handleLogout = () => {
    navigate("/"); // Redirect to login
  };

  return (
    <div className="flex min-h-screen bg-[#1a1a1a] text-white">
      {/* Sidebar */}
      <div className="w-38 rounded-3xl bg-[#2a2a2a] flex flex-col justify-between py-6">
  <div>
    <h1 className="text-md font-semibold text-[#FF9500] text-center mb-2">
      7E POS
    </h1>

    <nav className="space-y-0.5 px-8">
      {/* Dashboard Link */}
      <Link
        to="/dashboard"
        className="flex flex-col items-center gap-1 px-1 py-2 rounded-md hover:bg-[#FF9500] text-white"
      >
        <i className="fa-solid fa-chart-line text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs hover:text-black">Dashboard</span>
      </Link>
      <hr className="border-t border-white/20" />

      {/* Menu Link */}
      <Link
        to="/menu"
        className="flex flex-col items-center gap-1 px-1 py-2 rounded-md hover:bg-[#FF9500] text-white"
      >
        <i className="fa-solid fa-utensils text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs hover:text-black">Menu</span>
      </Link>
      <hr className="border-t border-white/20" />

      <Link
        to="/staff"
        className="flex flex-col items-center gap-1 px-1 py-2 rounded-md hover:bg-[#FF9500] text-white"
      >
        <i className="fa-solid fa-user-group text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs hover:text-black">Staff</span>
      </Link>
      <hr className="border-t border-white/20" />

      <Link
        to="/inventory"
        className="flex flex-col items-center gap-1 px-1 py-2 rounded-md hover:bg-[#FF9500] text-white"
      >
        <i className="fa-solid fa-boxes-stacked text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs hover:text-black">Inventory</span>
      </Link>
      <hr className="border-t border-white/20" />

      <Link
        to="/reports"
        className="flex flex-col items-center gap-1 px-1 py-2 rounded-md hover:bg-[#FF9500] text-white"
      >
        <i className="fa-solid fa-file-lines text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs hover:text-black">Reports</span>
      </Link>
      <hr className="border-t border-white/20" />

      <Link
        to="/order"
        className="flex flex-col items-center gap-1 px-1 py-2 rounded-md hover:bg-[#FF9500] text-white"
      >
        <i className="fa-solid fa-chair text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs hover:text-black">Order/Table</span>
      </Link>
      <hr className="border-t border-white/20" />

      <Link
        to="/reservation"
        className="flex flex-col items-center gap-1 px-1 py-2 rounded-md hover:bg-[#FF9500] text-white"
      >
        <i className="fa-solid fa-calendar-check text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs hover:text-black">Reservation</span>
      </Link>
      <hr className="border-t border-white/20" />
    </nav>
  </div>

  {/* Logout at bottom with space */}
<div className="mt-40 flex justify-center">
  <button
    onClick={handleLogout}
    className="flex flex-col items-center text-white"
  >
    <i className="fa-solid fa-right-from-bracket text-lg text-[#FF9500] bg-white rounded-full p-2 hover:bg-[#FF9500] hover:text-white"></i>
    <span className="text-sm  mt-1">Logout</span>
  </button>
</div>

</div>




      {/* Main Content */}
      <div className="flex-1 p-6">

        <div className="flex items-center justify-between bg-[#000000] p-4 rounded-lg mb-6 shadow">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#FF9500] transition"
            >
              <i className="fa-solid fa-chevron-left text-white"></i>
            </button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {/* Notification */}
            <div className="relative">
              <i className="fa-solid fa-bell text-xl text-white"></i>
              {/* <span className="absolute -top-1 -right-1 bg-[#FF9500] text-black text-xs font-bold rounded-full px-1.5">
                01
              </span> */}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-white/30"></div>

            {/* Avatar */}
            <Link to="/profile">
  <img
    src="https://randomuser.me/api/portraits/men/32.jpg"
    alt="Profile"
    className="w-8 h-8 rounded-full border-2 border-[#FF9500] cursor-pointer"
  />
</Link>
          </div>
        </div>
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-[#2a2a2a] rounded-xl shadow">
            <h3 className="text-sm text-gray-400">Daily Sales</h3>
            <p className="text-2xl font-bold mt-2">$2k</p>
          </div>
          <div className="p-4 bg-[#2a2a2a] rounded-xl shadow">
            <h3 className="text-sm text-gray-400">Monthly Revenue</h3>
            <p className="text-2xl font-bold mt-2">$55k</p>
          </div>
          <div className="p-4 bg-[#2a2a2a] rounded-xl shadow">
            <h3 className="text-sm text-gray-400">Table Occupancy</h3>
            <p className="text-2xl font-bold mt-2">25 Tables</p>
          </div>
        </div>

        {/* Popular Dishes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {["Popular Dishes", "Special Dishes"].map((title, idx) => (
            <div key={idx} className="p-4 bg-[#2a2a2a] rounded-xl shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <a href="#" className="text-[#FF9500] text-sm">
                  See All
                </a>
              </div>
              {dishes.map((dish, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-gray-700 last:border-none"
                >
                  <span>{dish.name}</span>
                  <span
                    className={`text-sm ${
                      dish.status === "In Stock"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {dish.status}
                  </span>
                  <span>${dish.price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="p-4 bg-[#2a2a2a] rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="space-x-2">
              {["Monthly", "Daily", "Weekly"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === tab
                      ? "bg-[#FF9500] text-white"
                      : "bg-[#3a3a3a] text-gray-300 hover:bg-[#4a4a4a]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="text-sm bg-[#FF9500] px-3 py-1 rounded-md hover:bg-orange-600">
              Export
            </button>
          </div>

          {/* Chart */}
          {/* <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#FF9500" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer> */}
        </div>
      </div>
    </div>
  );
}
