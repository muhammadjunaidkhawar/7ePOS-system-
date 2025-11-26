import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { NavLink } from "react-router-dom";

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
  const navigate = useNavigate(); 

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
    { 
      name: "Chicken Parmesan", 
      price: 50, 
      status: "In Stock", 
      img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_500,h_500,c_limit/Smashburger-recipe-120219.jpg" 
    },
    { 
      name: "Spaghetti Carbonara", 
      price: 55, 
      status: "Out of Stock",
      img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_500,h_500,c_limit/Smashburger-recipe-120219.jpg" 
    },
    
  ];

  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
     {/* Sidebar */}
<div className="w-38 rounded-3xl bg-[#2a2a2a] flex flex-col justify-between py-6">
  <div>
    <h1 className="text-md font-semibold text-[#FF9500] text-center mb-2">
      7E POS
    </h1>

    <nav className="space-y-0.5 px-8">

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
            isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
          }`
        }
      >
        <i className="fa-solid fa-chart-line text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs">Dashboard</span>
      </NavLink>
      <hr className="border-t border-white/20" />

      <NavLink
        to="/menu"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
            isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
          }`
        }
      >
        <i className="fa-solid fa-utensils text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs">Menu</span>
      </NavLink>
      <hr className="border-t border-white/20" />

      <NavLink
        to="/staff"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
            isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
          }`
        }
      >
        <i className="fa-solid fa-user-group text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs">Staff</span>
      </NavLink>
      <hr className="border-t border-white/20" />

      <NavLink
        to="/inventory"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
            isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
          }`
        }
      >
        <i className="fa-solid fa-boxes-stacked text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs">Inventory</span>
      </NavLink>
      <hr className="border-t border-white/20" />

      <NavLink
        to="/reports"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
            isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
          }`
        }
      >
        <i className="fa-solid fa-file-lines text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs">Reports</span>
      </NavLink>
      <hr className="border-t border-white/20" />

      <NavLink
        to="/order"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
            isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
          }`
        }
      >
        <i className="fa-solid fa-chair text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs">Order/Table</span>
      </NavLink>
      <hr className="border-t border-white/20" />

      <NavLink
        to="/reservation"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
            isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
          }`
        }
      >
        <i className="fa-solid fa-calendar-check text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
        <span className="text-xs">Reservation</span>
      </NavLink>
      <hr className="border-t border-white/20" />

    </nav>
  </div>

  {/* Logout at bottom */}
  <div className="mt-40 flex justify-center">
    <button
      onClick={handleLogout}
      className="flex flex-col items-center text-white"
    >
      <i className="fa-solid fa-right-from-bracket text-lg text-[#FF9500] bg-white rounded-full p-2 hover:bg-[#FF9500] hover:text-white"></i>
      <span className="text-sm mt-1">Logout</span>
    </button>
  </div>
</div>


      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navbar */}
        <div className="flex items-center justify-between p-4 rounded-lg mb-6 shadow">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#FF9500] transition"
            >
              <i className="fa-solid fa-chevron-left text-white"></i>
            </button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <i className="fa-solid fa-bell text-xl text-white"
              onClick={()=> navigate("/notification")}></i>
            </div>
            <div className="w-px h-6 bg-white/30"></div>
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

        {/* Popular / Special Dishes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {["Popular Dishes", "Popular Dishes"].map((title, idx) => (
            <div key={idx} className="p-4 bg-[#2a2a2a] rounded-xl shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <a href="#" className="text-[#FF9500] text-sm">
                  See All
                </a>
              </div>

              {dishes.map((dish) => (
                <div
                  key={dish.name}
                  className="flex justify-between items-center py-2 border-b border-gray-700 last:border-none"
                >
                  {/* Dish image + name */}
                  <div className="flex items-center gap-3">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <span>{dish.name}</span>
                  </div>

                  {/* Status */}
                  <span
                    className={`text-sm ${
                      dish.status === "In Stock"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {dish.status}
                  </span>

                  {/* Price */}
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
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#FF9500" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


// // sattipos/src/pages/Dashboard.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
// import { saveAs } from "file-saver";

// /**
//  * Dashboard.jsx
//  * Full page — connects to backend for real-time stats and export
//  * Make sure REACT_APP_API_URL is set (e.g., http://localhost:5000)
//  */

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("Monthly");
//   const navigate = useNavigate();

//   const API_BASE = import.meta.env.VITE_API_URL || "";


//   // real-time stats
//   const [stats, setStats] = useState({
//     dailySales: 0,
//     monthlyRevenue: 0,
//     tableOccupancy: 0,
//     dailyTrend: [],
//     monthlyTrend: [],
//     occupancyTrend: [],
//     lastUpdated: null,
//   });

//   const [popularLeft, setPopularLeft] = useState([]);
//   const [popularRight, setPopularRight] = useState([]);
//   const [overview, setOverview] = useState({ labels: [], sales: [], revenue: [] });

//   const socketRef = useRef(null);

//   useEffect(() => {
//     // fetch initial data
//     const fetchAll = async () => {
//       try {
//         const [statsRes, popRes, overviewRes] = await Promise.all([
//           axios.get(`${API_BASE}/api/dashboard/stats`),
//           axios.get(`${API_BASE}/api/dashboard/popular-dishes`),
//           axios.get(`${API_BASE}/api/dashboard/overview?range=12`),
//         ]);
//         if (statsRes.data) setStats((s) => ({ ...s, ...statsRes.data }));
//         if (popRes.data) {
//           setPopularLeft(popRes.data.slice(0, 4));
//           setPopularRight(popRes.data.slice(0, 4)); // duplicate for now (UI shows two lists)
//         }
//         if (overviewRes.data) setOverview(overviewRes.data);
//       } catch (err) {
//         console.error("fetchAll error", err);
//       }
//     };

//     fetchAll();

//     // socket.io connection for real-time updates
//     socketRef.current = io(API_BASE || "/", { transports: ["websocket"] });
//     socketRef.current.on("connect", () => {
//       // console.log("socket connected", socketRef.current.id);
//     });
//     socketRef.current.on("statsUpdated", (payload) => {
//       // payload contains updated stats
//       setStats((s) => ({ ...s, ...payload }));
//     });

//     socketRef.current.on("disconnect", () => {
//       // console.log("socket disconnected");
//     });

//     return () => {
//       if (socketRef.current) socketRef.current.disconnect();
//     };
//   }, [API_BASE]);

//   // chart data (overview) convert to recharts format
//   const overviewData = (overview.labels || []).map((label, idx) => ({
//     name: label,
//     sales: overview.sales ? overview.sales[idx] : 0,
//     revenue: overview.revenue ? overview.revenue[idx] : 0,
//   }));

//   // small helper chart for cards
//   const MiniBar = ({ data = [] }) => {
//     const safeData = (data && data.length > 0 ? data : [0, 0, 0, 0, 0, 0]).map((v, i) => ({ x: i, val: v }));
//     return (
//       <div style={{ width: 120, height: 36 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={safeData}>
//             <Bar dataKey="val" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   };

//   const formatCurrency = (v) => {
//     if (typeof v !== "number") return v;
//     if (Math.abs(v) >= 1000) return `$${(v / 1000).toFixed(0)}k`;
//     return `$${v}`;
//   };

//   // Export to Excel handler
//   const handleExport = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/dashboard/export-excel`, {
//         responseType: "arraybuffer",
//       });
//       const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//       saveAs(blob, `dashboard-report-${new Date().toISOString().slice(0, 10)}.xlsx`);
//     } catch (err) {
//       console.error("export error", err);
//       alert("Export failed. Check server logs.");
//     }
//   };

//   // small mock click handlers for demo (not required)
//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       {/* Sidebar */}
//       <div className="w-38 rounded-3xl bg-[#2a2a2a] flex flex-col justify-between py-6">
//         <div>
//           <h1 className="text-md font-semibold text-[#FF9500] text-center mb-2">Satti's POS</h1>
//           <nav className="space-y-0.5 px-8">
//             <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md ${isActive ? "bg-[#FF9500] text-black" : "text-white hover:bg-[#FF9500]"}`}>
//               <i className="fa-solid fa-chart-line text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="ml-2">Dashboard</span>
//             </NavLink>
//             <hr className="border-t border-white/10" />
//             <NavLink to="/menu" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md ${isActive ? "bg-[#FF9500] text-black" : "text-white hover:bg-[#FF9500]"}`}>
//               <i className="fa-solid fa-utensils text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="ml-2">Menu</span>
//             </NavLink>
//             <hr className="border-t border-white/10" />
//             <NavLink to="/staff" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md ${isActive ? "bg-[#FF9500] text-black" : "text-white hover:bg-[#FF9500]"}`}>
//               <i className="fa-solid fa-user-group text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="ml-2">Staff</span>
//             </NavLink>
//             <hr className="border-t border-white/10" />
//             <NavLink to="/inventory" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md ${isActive ? "bg-[#FF9500] text-black" : "text-white hover:bg-[#FF9500]"}`}>
//               <i className="fa-solid fa-boxes-stacked text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="ml-2">Inventory</span>
//             </NavLink>
//             <hr className="border-t border-white/10" />
//             <NavLink to="/reports" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md ${isActive ? "bg-[#FF9500] text-black" : "text-white hover:bg-[#FF9500]"}`}>
//               <i className="fa-solid fa-file-lines text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="ml-2">Reports</span>
//             </NavLink>
//             <hr className="border-t border-white/10" />
//             <NavLink to="/order" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md ${isActive ? "bg-[#FF9500] text-black" : "text-white hover:bg-[#FF9500]"}`}>
//               <i className="fa-solid fa-chair text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="ml-2">Order/Table</span>
//             </NavLink>
//             <hr className="border-t border-white/10" />
//             <NavLink to="/reservation" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md ${isActive ? "bg-[#FF9500] text-black" : "text-white hover:bg-[#FF9500]"}`}>
//               <i className="fa-solid fa-calendar-check text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="ml-2">Reservation</span>
//             </NavLink>
//           </nav>
//         </div>
//         <div className="flex justify-center mb-4">
//           <button onClick={handleLogout} className="flex flex-col items-center text-white">
//             <i className="fa-solid fa-right-from-bracket text-lg text-[#FF9500] bg-white rounded-full p-2 hover:bg-[#FF9500] hover:text-white"></i>
//             <span className="text-sm mt-1">Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         {/* Navbar */}
//         <div className="flex items-center justify-between p-4 rounded-lg mb-6 shadow">
//           <div className="flex items-center gap-3">
//             <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#FF9500] transition">
//               <i className="fa-solid fa-chevron-left text-white"></i>
//             </button>
//             <h1 className="text-xl font-semibold">Dashboard</h1>
//           </div>

//           <div className="flex items-center gap-6">
//             <div className="relative">
//               <i className="fa-solid fa-bell text-xl text-white" onClick={() => navigate("/notification")}></i>
//             </div>
//             <div className="w-px h-6 bg-white/30"></div>
//             <Link to="/profile">
//               <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="w-8 h-8 rounded-full border-2 border-[#FF9500] cursor-pointer" />
//             </Link>
//           </div>
//         </div>

//         {/* Top Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           {/* Daily Sales */}
//           <div className="p-4 bg-[#2a2a2a] rounded-xl shadow flex justify-between items-center">
//             <div>
//               <h3 className="text-sm text-gray-400">Daily Sales</h3>
//               <p className="text-2xl font-bold mt-2">{formatCurrency(stats.dailySales)}</p>
//               <p className="text-xs text-gray-500 mt-1">{stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : "—"}</p>
//             </div>
//             <div className="flex flex-col items-end gap-2">
//               <div className="w-8 h-8 rounded-full bg-[#FF9500] flex items-center justify-center text-black font-bold">$</div>
//               <MiniBar data={stats.dailyTrend} />
//             </div>
//           </div>

//           {/* Monthly Revenue */}
//           <div className="p-4 bg-[#2a2a2a] rounded-xl shadow flex justify-between items-center">
//             <div>
//               <h3 className="text-sm text-gray-400">Monthly Revenue</h3>
//               <p className="text-2xl font-bold mt-2">{formatCurrency(stats.monthlyRevenue)}</p>
//               <p className="text-xs text-gray-500 mt-1">1 Jan - 1 Feb</p>
//             </div>
//             <div className="flex flex-col items-end gap-2">
//               <div className="w-8 h-8 rounded-full bg-[#FF9500] flex items-center justify-center text-black font-bold">⊙</div>
//               <MiniBar data={stats.monthlyTrend} />
//             </div>
//           </div>

//           {/* Table Occupancy */}
//           <div className="p-4 bg-[#2a2a2a] rounded-xl shadow flex justify-between items-center">
//             <div>
//               <h3 className="text-sm text-gray-400">Table Occupancy</h3>
//               <p className="text-2xl font-bold mt-2">{stats.tableOccupancy} Tables</p>
//               <p className="text-xs text-gray-500 mt-1">Current usage</p>
//             </div>
//             <div className="flex flex-col items-end gap-2">
//               <div className="w-8 h-8 rounded-full bg-[#FF9500] flex items-center justify-center text-black font-bold">☻</div>
//               <MiniBar data={stats.occupancyTrend} />
//             </div>
//           </div>
//         </div>

//         {/* Popular Dishes (two boxes) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div className="p-4 bg-[#2a2a2a] rounded-xl shadow">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Popular Dishes</h3>
//               <a href="#" className="text-[#FF9500] text-sm">See All</a>
//             </div>
//             {popularLeft.map((dish) => (
//               <div key={dish.name} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-none">
//                 <div className="flex items-center gap-3">
//                   <img src={dish.image || "https://via.placeholder.com/70"} alt={dish.name} className="w-14 h-14 rounded-md object-cover" />
//                   <div>
//                     <div className="text-sm font-medium">{dish.name}</div>
//                     <div className="text-xs text-gray-400">Serving : 01 person</div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className={`text-sm ${dish.availability === "Available" ? "text-green-400" : "text-red-400"}`}>{dish.availability === "Available" ? "In Stock" : "Out of stock"}</div>
//                   <div className="text-sm mt-1">${dish.price}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="p-4 bg-[#2a2a2a] rounded-xl shadow">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Popular Dishes</h3>
//               <a href="#" className="text-[#FF9500] text-sm">See All</a>
//             </div>
//             {popularRight.map((dish) => (
//               <div key={dish.name} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-none">
//                 <div className="flex items-center gap-3">
//                   <img src={dish.image || "https://via.placeholder.com/70"} alt={dish.name} className="w-14 h-14 rounded-md object-cover" />
//                   <div>
//                     <div className="text-sm font-medium">{dish.name}</div>
//                     <div className="text-xs text-gray-400">Order : x{dish.count}</div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className={`text-sm ${dish.availability === "Available" ? "text-green-400" : "text-red-400"}`}>{dish.availability === "Available" ? "In Stock" : "Out of stock"}</div>
//                   <div className="text-sm mt-1">${dish.price}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Overview chart + export */}
//         <div className="p-4 bg-[#2a2a2a] rounded-xl shadow">
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 text-sm">
//                 <span className="inline-block w-3 h-3 rounded-full bg-[#FF9500]"></span> Sales
//                 <span className="inline-block w-3 h-3 rounded-full bg-white ml-4"></span> Revenue
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="rounded-md bg-[#2a2a2a] p-1 flex gap-2">
//                 {["Monthly", "Daily", "Weekly"].map((t) => (
//                   <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1 rounded-md text-sm ${activeTab === t ? "bg-[#FF9500] text-black" : "bg-[#3a3a3a] text-gray-300 hover:bg-[#4a4a4a]"}`}>{t}</button>
//                 ))}
//               </div>
//               <button onClick={handleExport} className="text-sm bg-[#FF9500] px-3 py-1 rounded-md hover:bg-orange-600">Export</button>
//             </div>
//           </div>

//           <div style={{ width: "100%", height: 320 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={overviewData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//                 <XAxis dataKey="name" stroke="#aaa" />
//                 <YAxis stroke="#aaa" />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={2} />
//                 <Line type="monotone" dataKey="sales" stroke="#FF9500" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
