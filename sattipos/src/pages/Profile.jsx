import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile"); // Switch between My Profile / Manage Access

  // Logout handler
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
            <Link
              to="/dashboard"
              className="flex flex-col items-center gap-1 px-1 py-2 rounded-md hover:bg-[#FF9500] text-white"
            >
              <i className="fa-solid fa-chart-line text-sm text-[#FF9500] bg-white rounded-full p-2"></i>
              <span className="text-xs hover:text-black">Dashboard</span>
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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#FF9500] transition"
            >
              <i className="fa-solid fa-chevron-left text-white"></i>
            </button>
            <h1 className="text-xl font-semibold">Profile</h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <i
                className="fa-solid fa-bell text-xl text-white cursor-pointer"
                onClick={() => navigate("/notification")}
              ></i>
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

        {/* Profile Content */}
        <div className="flex gap-6">
          {/* Left Sidebar for Profile Options */}
          <div className="w-64 space-y-3">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-2 text-sm px-4 py-3 rounded-lg ${
                activeTab === "profile"
                  ? "bg-[#FF9500] text-black"
                  : "bg-[#2a2a2a] text-white hover:bg-[#FF9500] hover:text-black"
              }`}
            >
              <i className="fa-solid fa-user"></i> My Profile
            </button>

            <button
              onClick={() => setActiveTab("access")}
              className={`w-full flex items-center gap-2 text-sm px-4 py-3 rounded-lg ${
                activeTab === "access"
                  ? "bg-[#FF9500] text-black"
                  : "bg-[#2a2a2a] text-white hover:bg-[#FF9500] hover:text-black"
              }`}
            >
              <i className="fa-solid fa-gear"></i> Manage Access
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 bg-[#2a2a2a] text-white text-sm px-4 py-3 rounded-lg hover:bg-[#FF9500] hover:text-black"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
            {/* Add New User */}
            <div className="w-64 space-y-3">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Add New User</h3>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full mb-2 bg-[#2a2a2a] text-sm px-3 py-2 rounded-md focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full mb-2 bg-[#2a2a2a] text-sm px-3 py-2 rounded-md focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Role"
                  className="w-full mb-2 bg-[#2a2a2a] text-sm px-3 py-2 rounded-md focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full mb-3 bg-[#2a2a2a] px-3 py-2 text-sm rounded-md focus:outline-none"
                />
                <button className="w-full bg-[#FF9500] text-black py-2 rounded-md text-sm font-medium hover:bg-[#ffa733]">
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Right Main Section */}
          <div className="flex-1 bg-[#2a2a2a] rounded-2xl p-6">
            {/* === My Profile === */}
            {activeTab === "profile" && (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  Personal Information
                </h2>

                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-[#FF9500]"
                    />
                    <button className="absolute bottom-2 right-2 bg-[#FF9500] p-2 rounded-full text-black hover:bg-[#ffa733]">
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  </div>
                  <h3 className="mt-3 text-lg font-medium">John Doe</h3>
                  <p className="text-sm text-[#FF9500]">Manager</p>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      className="w-full bg-[#1a1a1a] px-3 py-2 rounded-md focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      className="w-full bg-[#1a1a1a] px-3 py-2 rounded-md focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Address</label>
                    <input
                      type="text"
                      placeholder="Enter Your Address"
                      className="w-full bg-[#1a1a1a] px-3 py-2 rounded-md focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full bg-[#1a1a1a] px-3 py-2 rounded-md focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="w-full bg-[#1a1a1a] px-3 py-2 rounded-md focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      className="bg-[#FF9500] text-black px-4 py-2 rounded-md text-sm hover:bg-[#ffa733]"
                    >
                      Discard Changes
                    </button>
                    <button
                      type="submit"
                      className="bg-[#FF9500] text-black px-4 py-2 rounded-md text-sm hover:bg-[#ffa733]"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* === Manage Access === */}
            {activeTab === "access" && (
              <div className="flex gap-6">
                {/* Manage Users */}
                <div className="flex-1 space-y-6">
                  {[
                    {
                      name: "Abubakar Sherazi",
                      email: "abubakarsherazi@gmail.com",
                      role: "Admin",
                    },
                    {
                      name: "Anees Ansari",
                      email: "aneesansari@gmail.com",
                      role: "Sub Admin",
                    },
                  ].map((user, idx) => (
                    <div key={idx} className=" p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-sm text-[#FF9500]">{user.email}</p>
                        </div>
                        <span className="bg-[#FF9500] text-black text-xs px-2 py-1 rounded">
                          {user.role}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-4 text-sm">
                        {[
                          "Dashboard",
                          "Reports",
                          "Inventory",
                          "Orders",
                          "Customers",
                          "Settings",
                        ].map((label, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <span>{label}</span>
                            <label className="relative inline-flex items-center cursor-pointer mt-1">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                defaultChecked={i % 2 === 0}
                              />
                              <div className="w-10 h-5 bg-gray-600 rounded-full peer-checked:bg-[#FF9500] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                      {idx === 0 && (
                        <div className="border-t border-white/20 mt-6"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
