import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Keep useNavigate

export default function Reservation() {
  // const [activeTab, setActiveTab] = useState("Monthly");
  const navigate = useNavigate(); // ✅ Needed for logout

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
            <span className="text-sm mt-1">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content (commented for now, keep sidebar only) */}
      {/*
      <div className="flex-1 p-6">
        ...your charts, dishes, etc...
      </div>
      */}
    </div>
  );
}
