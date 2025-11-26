import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Notification() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Low Inventory Alert",
      message:
        "This is to notify you that the following items are running low in stock:",
      date: "07/04/24",
      read: false,
    },
    {
      id: 2,
      title: "Low Inventory Alert",
      message:
        "This is to notify you that the following items are running low in stock:",
      date: "07/04/24",
      read: false,
    },
    {
      id: 3,
      title: "Low Inventory Alert",
      message:
        "This is to notify you that the following items are running low in stock:",
      date: "07/04/24",
      read: true,
    },
    {
      id: 4,
      title: "Low Inventory Alert",
      message:
        "This is to notify you that the following items are running low in stock:",
      date: "07/04/24",
      read: true,
    },
    {
      id: 4,
      title: "Low Inventory Alert",
      message:
        "This is to notify you that the following items are running low in stock:",
      date: "07/04/24",
      read: true,
    },
    {
      id: 4,
      title: "Low Inventory Alert",
      message:
        "This is to notify you that the following items are running low in stock:",
      date: "07/04/24",
      read: true,
    },
    {
      id: 4,
      title: "Low Inventory Alert",
      message:
        "This is to notify you that the following items are running low in stock:",
      date: "07/04/24",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState("All");

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications =
    filter === "All" ? notifications : notifications.filter((n) => !n.read);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-38 rounded-3xl bg-[#2a2a2a] flex flex-col justify-between py-6">
        <div>
          <h1 className="text-md font-semibold text-[#FF9500] text-center mb-2">
            7E POS
          </h1>

          <nav className="space-y-0.5 px-8">
            <Link
              to="/dashboard"
              className="flex flex-col items-center gap-1 px-1 py-2 rounded-md hover:bg-[#FF9500] text-white"
            >
              <i className="fa-solid fa-chart-line text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
              <span className="text-xs">Dashboard</span>
            </Link>
            <hr className="border-t border-white/20" />
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
        {/* Navbar */}
        <div className="flex items-center justify-between p-4 rounded-lg mb-6 shadow">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#FF9500] transition"
            >
              <i className="fa-solid fa-chevron-left text-white"></i>
            </button>
            <h1 className="text-xl font-semibold">Notification</h1>
          </div>

          <div className="flex items-center gap-6">
            <i className="fa-solid fa-bell text-xl text-[#FF9500]"></i>
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

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-400">
              You’ve {notifications.filter((n) => !n.read).length} unread
              notification
            </p>
          </div>
          <button
            onClick={handleMarkAllRead}
            className="bg-[#FF9500] px-4 py-2 rounded-md text-sm hover:bg-orange-600"
          >
            Mark all as read
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {["All", "Unread"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-md text-sm ${
                filter === tab
                  ? "bg-[#FF9500] text-white"
                  : "bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <p className="text-gray-400">No notifications to display.</p>
          ) : (
            filteredNotifications.map((n) => (
              <div
                key={n.id}
                className="flex justify-between items-center p-4 bg-[#2a2a2a] rounded-lg shadow hover:bg-[#3a3a3a] transition"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#FF9500]/20 p-3 rounded-lg">
                    <i className="fa-solid fa-triangle-exclamation text-[#FF9500] text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#FF9500]">{n.title}</h4>
                    <p className="text-sm text-gray-300">{n.message}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">{n.date}</span>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="bg-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
