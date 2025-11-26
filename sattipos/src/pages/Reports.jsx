// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
// import { NavLink } from "react-router-dom";

// export default function Reports() {
//   const [activeTab, setActiveTab] = useState("Reservation Report");
//   const navigate = useNavigate(); // ✅ Needed for logout

//   // Logout handler
//   const handleLogout = () => {
//     navigate("/"); // Redirect to login
//   };

//   // Dummy Data
//   const data = [
//     {
//       id: "#12354564",
//       name: "Watson Joyce",
//       phone: "+1 (123) 123 4654",
//       date: "28.03.2024",
//       checkIn: "03:18 PM",
//       checkOut: "05:00 PM",
//       total: "$250.00",
//     },
//   ];

//   // Chart Data (Commented)

//   const pieData = [
//     { name: "Confirmed", value: 110 },
//     { name: "Awaited", value: 40 },
//     { name: "Cancelled", value: 30 },
//     { name: "Failed", value: 12 },
//   ];

//   const COLORS = ["#FF9800", "#FFC107", "#F44336", "#9E9E9E"];

//   const lineData = [
//     { name: "Jan", Confirmed: 3000, Awaited: 2000 },
//     { name: "Feb", Confirmed: 4000, Awaited: 2400 },
//     { name: "Mar", Confirmed: 3500, Awaited: 2200 },
//     { name: "Apr", Confirmed: 5000, Awaited: 2600 },
//     { name: "May", Confirmed: 4200, Awaited: 2800 },
//     { name: "Jun", Confirmed: 3800, Awaited: 2300 },
//     { name: "Jul", Confirmed: 4600, Awaited: 2700 },
//     { name: "Aug", Confirmed: 4800, Awaited: 3000 },
//     { name: "Sep", Confirmed: 4400, Awaited: 2500 },
//     { name: "Oct", Confirmed: 4900, Awaited: 3100 },
//     { name: "Nov", Confirmed: 4700, Awaited: 2900 },
//     { name: "Dec", Confirmed: 5100, Awaited: 3300 },
//   ];

//   return (
//     <div className="flex min-h-screen bg-[#1a1a1a] text-white">
//       {/* Sidebar */}
//       <div className="w-38 rounded-3xl bg-[#2a2a2a] flex flex-col justify-between py-6">
//         <div>
//           <h1 className="text-md font-semibold text-[#FF9500] text-center mb-2">
//             7E POS
//           </h1>

//           <nav className="space-y-0.5 px-8">
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
//                   isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
//                 }`
//               }
//             >
//               <i className="fa-solid fa-chart-line text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="text-xs">Dashboard</span>
//             </NavLink>
//             <hr className="border-t border-white/20" />

//             <NavLink
//               to="/menu"
//               className={({ isActive }) =>
//                 `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
//                   isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
//                 }`
//               }
//             >
//               <i className="fa-solid fa-utensils text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="text-xs">Menu</span>
//             </NavLink>
//             <hr className="border-t border-white/20" />

//             <NavLink
//               to="/staff"
//               className={({ isActive }) =>
//                 `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
//                   isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
//                 }`
//               }
//             >
//               <i className="fa-solid fa-user-group text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="text-xs">Staff</span>
//             </NavLink>
//             <hr className="border-t border-white/20" />

//             <NavLink
//               to="/inventory"
//               className={({ isActive }) =>
//                 `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
//                   isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
//                 }`
//               }
//             >
//               <i className="fa-solid fa-boxes-stacked text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="text-xs">Inventory</span>
//             </NavLink>
//             <hr className="border-t border-white/20" />

//             <NavLink
//               to="/reports"
//               className={({ isActive }) =>
//                 `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
//                   isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
//                 }`
//               }
//             >
//               <i className="fa-solid fa-file-lines text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="text-xs">Reports</span>
//             </NavLink>
//             <hr className="border-t border-white/20" />

//             <NavLink
//               to="/order"
//               className={({ isActive }) =>
//                 `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
//                   isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
//                 }`
//               }
//             >
//               <i className="fa-solid fa-chair text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="text-xs">Order/Table</span>
//             </NavLink>
//             <hr className="border-t border-white/20" />

//             <NavLink
//               to="/reservation"
//               className={({ isActive }) =>
//                 `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
//                   isActive ? "bg-[#FF9500] text-black" : "hover:bg-[#FF9500]"
//                 }`
//               }
//             >
//               <i className="fa-solid fa-calendar-check text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
//               <span className="text-xs">Reservation</span>
//             </NavLink>
//             <hr className="border-t border-white/20" />
//           </nav>
//         </div>

//         {/* Logout at bottom */}
//         <div className="mt-40 flex justify-center">
//           <button
//             onClick={handleLogout}
//             className="flex flex-col items-center text-white"
//           >
//             <i className="fa-solid fa-right-from-bracket text-lg text-[#FF9500] bg-white rounded-full p-2 hover:bg-[#FF9500] hover:text-white"></i>
//             <span className="text-sm mt-1">Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         {/* Navbar */}
//         <div className="flex items-center justify-between p-4 rounded-lg mb-6 shadow ">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate(-1)}
//               className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#FF9500] transition"
//             >
//               <i className="fa-solid fa-chevron-left text-white"></i>
//             </button>
//             <h1 className="text-xl font-semibold">Reports</h1>
//           </div>
//           <div className="flex items-center gap-6">
//             <div className="relative">
//               <i
//                 className="fa-solid fa-bell text-xl text-white"
//                 onClick={() => navigate("/notification")}
//               ></i>
//             </div>
//             <div className="w-px h-6 bg-white/30"></div>
//             <Link to="/profile">
//               <img
//                 src="https://randomuser.me/api/portraits/men/32.jpg"
//                 alt="Profile"
//                 className="w-8 h-8 rounded-full border-2 border-[#FF9500] cursor-pointer"
//               />
//             </Link>
//           </div>
//         </div>

//         {/* Reports Page */}
//         {/* Header with Tabs & Date Filters in One Line */}
//         <div className="flex justify-between text-sm items-center  mb-6">
//           {/* Tabs on Left */}
//           <div className="flex gap-4 ">
//             {["Reservation Report", "Revenue Report", "Staff Report"].map(
//               (tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 rounded ${
//                     activeTab === tab ? "bg-[#FF9500]" : "bg-[#2a2a2a]"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               )
//             )}
//           </div>

//           {/* Date Filters + Generate Report on Right */}
//           <div className="flex items-center text-sm gap-4">
//             <input
//               type="date"
//               className="p-2 rounded bg-[#2a2a2a] text-white hover:bg-[#FF9500]"
//             />
//             <input
//               type="date"
//               className="p-2 rounded bg-[#2a2a2a] text-white hover:bg-[#FF9500]"
//             />
//             <button className="px-4 py-2 bg-[#FF9500] text-white rounded">
//               Generate Report
//             </button>
//           </div>
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           {/* Pie Chart (Commented) */}
//           <div className="bg-[#2a2a2a] p-4 rounded-xl shadow flex items-center justify-center h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   dataKey="value"
//                   label
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Line Chart (Commented) */}
//           <div className="bg-[#2a2a2a] p-4 rounded-xl shadow flex items-center justify-center h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={lineData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="Confirmed" stroke="#FF9800" />
//                 <Line type="monotone" dataKey="Awaited" stroke="#8884d8" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Table Section */}
//         <div className="bg-[#2a2a2a] p-4 rounded-xl shadow space-y-4 ">
//           {data.map((row) => (
//             <div key={row.id} className="p-4 bg-[#1e1e1e]">
//               {/* Headings */}
//               <div className="grid grid-cols-7 gap-4 font-normal text-orange-400 text-sm text-left">
//                 <p>Reservation ID</p>
//                 <p>Customer Name</p>
//                 <p>Phone Number</p>
//                 <p>Reservation Date</p>
//                 <p>Check In</p>
//                 <p>Check Out</p>
//                 <p>Total</p>
//               </div>

//               {/* Row Data */}
//               <div className="grid grid-cols-7 gap-4 text-sm text-left">
//                 <p>{row.id}</p>
//                 <p>{row.name}</p>
//                 <p>{row.phone}</p>
//                 <p>{row.date}</p>
//                 <p>{row.checkIn}</p>
//                 <p>{row.checkOut}</p>
//                 <p>{row.total}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("Reservation Report");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const COLORS = ["#FF9800", "#FFC107", "#F44336", "#9E9E9E"];

  // Fetch report data dynamically
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const type =
          activeTab === "Reservation Report"
            ? "reservation"
            : activeTab === "Revenue Report"
            ? "revenue"
            : "staff";

        const res = await axios.get(
          `http://localhost:5000/api/reports?type=${type}`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };
    fetchReport();
  }, [activeTab]);

  // Generate PDF
  const handleGeneratePDF = async () => {
    const type =
      activeTab === "Reservation Report"
        ? "reservation"
        : activeTab === "Revenue Report"
        ? "revenue"
        : "staff";

    try {
      const response = await axios.get(
        `http://localhost:5000/api/reports/generate-pdf?type=${type}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${type}_report.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error generating report PDF:", error);
    }
  };

  const pieData = [
    { name: "Confirmed", value: 110 },
    { name: "Awaited", value: 40 },
    { name: "Cancelled", value: 30 },
    { name: "Failed", value: 12 },
  ];

  const lineData = [
    { name: "Jan", Confirmed: 3000, Awaited: 2000 },
    { name: "Feb", Confirmed: 4000, Awaited: 2400 },
    { name: "Mar", Confirmed: 3500, Awaited: 2200 },
    { name: "Apr", Confirmed: 5000, Awaited: 2600 },
  ];

  return (
    <div className="flex min-h-screen bg-[#1a1a1a] text-white">
      {/* Sidebar */}
      <div className="w-38 rounded-3xl bg-[#2a2a2a] flex flex-col justify-between py-6">
        <div>
          <h1 className="text-md font-semibold text-[#FF9500] text-center mb-2">
            7E POS
          </h1>
          <nav className="space-y-0.5 px-8">
            {[
              { to: "/dashboard", icon: "chart-line", label: "Dashboard" },
              { to: "/menu", icon: "utensils", label: "Menu" },
              { to: "/staff", icon: "user-group", label: "Staff" },
              { to: "/inventory", icon: "boxes-stacked", label: "Inventory" },
              { to: "/reports", icon: "file-lines", label: "Reports" },
              { to: "/order", icon: "chair", label: "Order/Table" },
              {
                to: "/reservation",
                icon: "calendar-check",
                label: "Reservation",
              },
            ].map(({ to, icon, label }) => (
              <div key={label}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
                      isActive
                        ? "bg-[#FF9500] text-black"
                        : "hover:bg-[#FF9500]"
                    }`
                  }
                >
                  <i
                    className={`fa-solid fa-${icon} text-sm text-[#FF9500] bg-white rounded-full p-2`}
                  ></i>
                  <span className="text-xs">{label}</span>
                </NavLink>
                <hr className="border-t border-white/20" />
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-40 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex flex-col items-center text-white"
          >
            <i className="fa-solid fa-right-from-bracket text-lg text-[#FF9500] bg-white rounded-full p-2 hover:bg-[#FF9500] hover:text-white"></i>
            <span className="text-sm mt-1">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between p-4 rounded-lg mb-6 shadow">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#FF9500] transition"
            >
              <i className="fa-solid fa-chevron-left text-white"></i>
            </button>
            <h1 className="text-xl font-semibold">Reports</h1>
          </div>
          <div className="flex items-center gap-6">
            <i className="fa-solid fa-bell text-xl text-white cursor-pointer"></i>
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

        {/* Tabs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            {["Reservation Report", "Revenue Report", "Staff Report"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded ${
                    activeTab === tab ? "bg-[#FF9500]" : "bg-[#2a2a2a]"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
          <button
            onClick={handleGeneratePDF}
            className="px-4 py-2 bg-[#FF9500] text-white rounded"
          >
            Generate Report
          </button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#2a2a2a] p-4 rounded-xl shadow flex items-center justify-center h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#2a2a2a] p-4 rounded-xl shadow flex items-center justify-center h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Confirmed" stroke="#FF9800" />
                <Line type="monotone" dataKey="Awaited" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Cards */}
        <div className="bg-[#2a2a2a] p-4 rounded-xl shadow space-y-4">
          {data.length > 0 ? (
            data.map((row, i) => (
              <div
                key={i}
                className="bg-[#1f1f1f] p-5 rounded-xl shadow-lg border border-[#ff950033] hover:border-[#FF9500] transition-all duration-300"
              >
                {/* Card Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="text-[#FF9500] font-bold">#{i + 1}</span>—{" "}
                    {row.name || row.item || "Record"}
                  </h3>

                  <span className="text-xs bg-[#FF950020] text-[#FF9500] px-3 py-1 rounded-full border border-[#FF950040]">
                    {row.status || "Active"}
                  </span>
                </div>

                {/* Orange Divider Line */}
                <div className="w-full h-[1px] bg-[#ff95004d] mb-4" />

                {/* Card Content Grid */}
                <div className="grid grid-cols-2 gap-3 text-gray-300 text-sm">
                  {Object.keys(row).map((key) => (
                    <div
                      key={key}
                      className="flex flex-col bg-[#262626] p-3 rounded-lg border border-[#3a3a3a] hover:border-[#FF9500] transition-all duration-200"
                    >
                      <span className="text-[#FF9500] text-xs uppercase tracking-wider">
                        {key.replace(/_/g, " ")}
                      </span>

                      <span className="text-white mt-1 break-all">
                        {String(row[key])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
