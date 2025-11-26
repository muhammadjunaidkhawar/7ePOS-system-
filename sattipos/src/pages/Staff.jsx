// src/pages/Staff.jsx  (or wherever your file is located)
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Staff() {
  const [activeSection, setActiveSection] = useState("staff");
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileToShow, setProfileToShow] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null); // for edit mode
  const [staffList, setStaffList] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [attendanceReloadTrigger, setAttendanceReloadTrigger] = useState(0);

  const navigate = useNavigate();

  // backend base
  const API_BASE = "http://localhost:5000/api";

  // fetch staff list on mount
  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [attendanceReloadTrigger]);

  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${API_BASE}/staff`);
      setStaffList(res.data);
    } catch (err) {
      console.error("fetchStaff error:", err.response?.data || err.message);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${API_BASE}/attendance`);
      setAttendance(res.data);
    } catch (err) {
      console.error(
        "fetchAttendance error:",
        err.response?.data || err.message
      );
    }
  };

  // Logout handler
  const handleLogout = () => {
    navigate("/"); // Redirect to login
  };

  // Open Add Staff panel - new or edit
  const openAddStaffPanel = (staff = null) => {
    setEditingStaff(staff);
    setShowAddStaff(true);
  };

  // Save staff (create or update)
  const saveStaff = async (formData, isEdit = false, staffId = null) => {
    try {
      if (isEdit && staffId) {
        // PUT
        const res = await axios.put(`${API_BASE}/staff/${staffId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // update local list
        setStaffList((prev) =>
          prev.map((s) => (s._id === res.data._id ? res.data : s))
        );
      } else {
        // POST
        const res = await axios.post(`${API_BASE}/staff`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setStaffList((prev) => [res.data, ...prev]);
      }
      setShowAddStaff(false);
      setEditingStaff(null);
      fetchAttendance();
    } catch (err) {
      console.error("saveStaff error:", err.response?.data || err.message);
      alert(err?.response?.data?.message || "Failed to save staff");
    }
  };

  // Delete staff
  const deleteStaff = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?"))
      return;
    try {
      await axios.delete(`${API_BASE}/staff/${id}`);
      setStaffList((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("deleteStaff error:", err.response?.data || err.message);
      alert("Failed to delete staff");
    }
  };

  // Show profile modal (centered)
  const openProfileModal = (staff) => {
    setProfileToShow(staff);
    setShowProfileModal(true);
  };

  // -------------------------
  // Attendance functions
  // -------------------------
  const addOrUpdateAttendance = async (att) => {
    // att = { _id?, staffId, date, timings, status }
    try {
      if (att._id) {
        const res = await axios.put(`${API_BASE}/attendance/${att._id}`, att);
        setAttendance((prev) =>
          prev.map((a) => (a._id === res.data._id ? res.data : a))
        );
      } else {
        const res = await axios.post(`${API_BASE}/attendance`, att);
        setAttendance((prev) => [res.data, ...prev]);
      }
    } catch (err) {
      console.error(
        "addOrUpdateAttendance error:",
        err.response?.data || err.message
      );
      alert("Failed to save attendance");
    }
  };

  const deleteAttendance = async (id) => {
    if (!window.confirm("Delete attendance?")) return;
    try {
      await axios.delete(`${API_BASE}/attendance/${id}`);
      setAttendance((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(
        "deleteAttendance error:",
        err.response?.data || err.message
      );
      alert("Failed to delete attendance");
    }
  };

  // -------------------------
  // Local handlers used in UI (the same names/behavior you had)
  // -------------------------
  // Update attendance entry's status (UI + backend)
  const handleStatusChange = async (index, status) => {
    const entry = attendance[index];
    if (!entry) return;
    const updated = { ...entry, status, showAll: false };
    await addOrUpdateAttendance(updated);
    // refresh from server to keep consistent
    setAttendanceReloadTrigger((t) => t + 1);
  };

  // Toggle back to showAll (show statuses options)
  const handleEditClick = (index) => {
    const updated = [...attendance];
    updated[index] = { ...updated[index], showAll: true };
    setAttendance(updated);
  };

  // When Add Staff/ Edit Submit inside panel calls this -> expects FormData
  // We'll implement the AddStaffPanel component inside this file (keeps single-file)
  // but visually identical to your previous panel.
  // -------------------------
  return (
    <div className="flex min-h-screen bg-[#1a1a1a] text-white">
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

      {/* Staff Management Content */}
      <div className="flex-1 p-6 bg-[#0d0d0d] text-white min-h-screen">
        {/* Navbar */}
        <div className="flex items-center justify-between bg-[#0d0d0d] p-4 rounded-lg mb-6 shadow">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#FF9500] transition"
            >
              <i className="fa-solid fa-chevron-left text-white"></i>
            </button>
            <h1 className="text-xl font-semibold">Staff Management</h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {/* Notification */}
            <div className="relative">
              <i
                className="fa-solid fa-bell text-xl text-white"
                onClick={() => navigate("/notification")}
              ></i>
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

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          {/* Left side buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setActiveSection("staff")}
              className={`text-sm px-4 py-2 rounded-md ${
                activeSection === "staff"
                  ? "bg-[#FF9500] text-white"
                  : "bg-[#2a2a2a] text-white hover:bg-[#FF9500] hover:text-black"
              }`}
            >
              Staff Management
            </button>

            <button
              onClick={() => setActiveSection("attendance")}
              className={`text-sm px-4 py-2 rounded-md ${
                activeSection === "attendance"
                  ? "bg-[#FF9500] text-white"
                  : "bg-[#2a2a2a] text-white hover:bg-[#FF9500] hover:text-black"
              }`}
            >
              Attendance
            </button>
          </div>

          {/* Right side buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => openAddStaffPanel(null)}
              className="bg-[#FF9500] hover:bg-[#e68806] text-white px-4 py-2 rounded-md"
            >
              Add Staff
            </button>

            <div className="relative">
              <select className="bg-[#FF9500] px-4 py-2 rounded-md text-sm hover:bg-[#e68806] hover:text-black outline-[#FF9500]">
                <option>Sort by</option>
                <option>Name</option>
                <option>Age</option>
                <option>Salary</option>
              </select>
            </div>
          </div>
        </div>

        {/* Staff Table */}
        {activeSection === "staff" && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className=" text-white text-xs">
                  <th className="p-3 text-left">
                    <input type="checkbox" />
                  </th>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Age</th>
                  <th className="p-3 text-left">Salary</th>
                  <th className="p-3 text-left">Timings</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((member, index) => (
                  <tr
                    key={member._id || index}
                    className="border-b  border-gray-700 hover:bg-[#2f2f2f]"
                  >
                    <td className="p-3">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3">
                      {member.staffId || member._id || "#--"}
                    </td>
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={
                          member.photoUrl
                            ? `http://localhost:5000${member.photoUrl}`
                            : "/default-avatar.png"
                        }
                        alt={member.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <div>
                        <div className="text-sm">{member.fullName}</div>
                        <span className="text-xs text-orange-400">
                          {member.role}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{member.email}</td>
                    <td className="p-3 text-sm">{member.phone}</td>
                    <td className="p-3 text-sm">{member.age}</td>
                    <td className="p-3 text-sm">{member.salary}</td>
                    <td className="p-3 text-sm">{member.shiftTimings}</td>
                    <td className="p-3 flex gap-3 items-center justify-center">
                      {/* View Profile */}
                      <button
                        title="View Profile"
                        onClick={() => openProfileModal(member)}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FFB84C] to-[#FF9500] text-black shadow-md hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-lg"
                      >
                        <i className="fa-solid fa-eye text-sm"></i>
                      </button>

                      {/* Edit Staff */}
                      <button
                        title="Edit"
                        onClick={() => openAddStaffPanel(member)}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-[#3a3a3a] to-[#1f1f1f] text-[#FF9500] shadow-md hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-lg hover:text-white"
                      >
                        <i className="fa-solid fa-pen-to-square text-sm"></i>
                      </button>

                      {/* Delete Staff */}
                      <button
                        title="Delete"
                        onClick={() => deleteStaff(member._id)}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-[#ff4d4d] to-[#b30000] text-white shadow-md hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-lg"
                      >
                        <i className="fa-solid fa-trash text-sm"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Attendance Table */}
        {activeSection === "attendance" && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-white text-xs">
                  <th className="p-3 text-left">
                    <input type="checkbox" />
                  </th>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Timings</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((person, index) => (
                  <tr
                    key={person._id || index}
                    className="border-b  border-gray-700 hover:bg-[#2f2f2f]"
                  >
                    <td className="p-3">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3">{person.staffId || person._id}</td>
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={
                          person.photoUrl
                            ? `http://localhost:5000${person.photoUrl}`
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                person.fullName || "Staff"
                              )}&background=random`
                        }
                        alt={person.fullName}
                        className="w-8 h-8 rounded-full object-cover"
                      />

                      <div>
                        <div className="text-sm">{person.name}</div>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{person.date}</td>
                    <td className="p-3 text-sm">{person.timings}</td>
                    <td className="p-3 flex gap-3 items-center justify-center">
                      {person.showAll ? (
                        ["Present", "Absent", "Half Shift", "Leave"].map(
                          (status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(index, status)}
                              className={`text-xs px-4 py-2 rounded-full font-semibold tracking-wide shadow-md transition-all duration-300 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ${
                                status === "Present"
                                  ? "bg-green-500 text-black hover:bg-green-400"
                                  : status === "Absent"
                                  ? "bg-yellow-400 text-black hover:bg-yellow-300"
                                  : status === "Half Shift"
                                  ? "bg-sky-400 text-black hover:bg-sky-300"
                                  : "bg-red-500 text-black hover:bg-red-400"
                              }`}
                            >
                              {status}
                            </button>
                          )
                        )
                      ) : (
                        <>
                          <span
                            className={`text-xs px-4 py-2 rounded-full font-semibold shadow-md border border-gray-700 transition-all duration-300 ${
                              person.status === "Present"
                                ? "bg-green-500 text-black hover:bg-green-400"
                                : person.status === "Absent"
                                ? "bg-yellow-400 text-black hover:bg-yellow-300"
                                : person.status === "Half Shift"
                                ? "bg-sky-400 text-black hover:bg-sky-300"
                                : "bg-red-500 text-black hover:bg-red-400"
                            }`}
                          >
                            {person.status}
                          </span>

                          <button
                            onClick={() => handleEditClick(index)}
                            className="text-xs px-3 py-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-white font-medium shadow-md hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:scale-105 active:scale-95"
                          >
                            <i className="fa-solid fa-pen mr-1 text-[#FF9500]"></i>
                            Edit
                          </button>

                          <button
                            onClick={() => deleteAttendance(person._id)}
                            className="text-xs px-3 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-medium shadow-md hover:from-red-500 hover:to-red-600 transition-all duration-300 hover:scale-105 active:scale-95"
                          >
                            <i className="fa-solid fa-trash mr-1"></i>Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Staff Panel (right-side overlay) */}
        <div
          className={`absolute top-0 right-0 w-[35%] h-full bg-[#2a2a2a] shadow-lg border-l border-gray-700 p-6 overflow-y-auto transform transition-all duration-500 ease-in-out ${
            showAddStaff
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 pointer-events-none"
          }`}
        >
          <AddOrEditStaffPanel
            onClose={() => {
              setShowAddStaff(false);
              setEditingStaff(null);
            }}
            onSave={saveStaff}
            editingStaff={editingStaff}
          />
        </div>

        {/* Centered Profile Modal (stylish design with #FF9500 theme) */}
        {showProfileModal && profileToShow && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Dark overlay */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => {
                setShowProfileModal(false);
                setProfileToShow(null);
              }}
            />

            {/* Modal Box */}
            <div className="relative bg-[#1a1a1a] w-[520px] rounded-2xl shadow-2xl border border-[#FF9500]/40 p-6 z-60 animate-fadeIn">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-gray-700 pb-3">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={
                        profileToShow.photoUrl
                          ? `http://localhost:5000${profileToShow.photoUrl}`
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              profileToShow.fullName || "Staff"
                            )}&background=random`
                      }
                      alt={profileToShow.fullName}
                      className="w-20 h-20 rounded-full object-cover border-4 border-[#FF9500] shadow-lg"
                    />
                    <span className="absolute bottom-1 right-1 bg-[#FF9500] w-3 h-3 rounded-full border border-black"></span>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {profileToShow.fullName}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {profileToShow.role}
                    </p>
                  </div>
                </div>

                <button
                  className="text-gray-400 hover:text-[#FF9500] transition-colors text-xl"
                  onClick={() => {
                    setShowProfileModal(false);
                    setProfileToShow(null);
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Profile Info */}
              <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-gray-200">
                <div>
                  <b className="text-[#FF9500]">Staff ID:</b>{" "}
                  {profileToShow.staffId}
                </div>
                <div>
                  <b className="text-[#FF9500]">DB ID:</b> {profileToShow._id}
                </div>
                <div>
                  <b className="text-[#FF9500]">Email:</b>
                  <div className="text-gray-300">{profileToShow.email}</div>
                </div>
                <div>
                  <b className="text-[#FF9500]">Phone:</b>
                  <div className="text-gray-300">{profileToShow.phone}</div>
                </div>
                <div>
                  <b className="text-[#FF9500]">Age:</b>
                  <div className="text-gray-300">{profileToShow.age}</div>
                </div>
                <div>
                  <b className="text-[#FF9500]">Salary:</b>
                  <div className="text-gray-300">{profileToShow.salary}</div>
                </div>
                <div>
                  <b className="text-[#FF9500]">Shift:</b>
                  <div className="text-gray-300">
                    {profileToShow.shiftTimings}
                  </div>
                </div>
                <div>
                  <b className="text-[#FF9500]">Address:</b>
                  <div className="text-gray-300">{profileToShow.address}</div>
                </div>

                <div className="col-span-2">
                  <b className="text-[#FF9500]">Additional Details:</b>
                  <div className="mt-2 p-3 bg-[#121212] rounded-lg border border-[#FF9500]/20 text-gray-300">
                    {profileToShow.additionalDetails || "—"}
                  </div>
                </div>
              </div>

              {/* Footer button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    setProfileToShow(null);
                  }}
                  className="px-4 py-2 bg-[#FF9500] text-black font-semibold rounded-lg hover:bg-[#ffa733] transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// AddOrEditStaffPanel component (keeps it inside same file so you can paste once)
// ------------------------------------------------------------------
function AddOrEditStaffPanel({ onClose, onSave, editingStaff }) {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrlPreview, setPhotoUrlPreview] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Manager");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [dob, setDob] = useState("");
  const [shiftStart, setShiftStart] = useState("");
  const [shiftEnd, setShiftEnd] = useState("");
  const [address, setAddress] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingStaff) {
      setFullName(editingStaff.fullName || "");
      setEmail(editingStaff.email || "");
      setRole(editingStaff.role || "Manager");
      setPhone(editingStaff.phone || "");
      setSalary(editingStaff.salary || "");
      setDob(editingStaff.dob ? editingStaff.dob.split("T")[0] : "");
      setShiftStart(editingStaff.shiftStart || "");
      setShiftEnd(editingStaff.shiftEnd || "");
      setAddress(editingStaff.address || "");
      setAdditionalDetails(editingStaff.additionalDetails || "");
      setPhotoUrlPreview(editingStaff.photoUrl || "");
    } else {
      // reset fields on new
      setFullName("");
      setEmail("");
      setRole("Manager");
      setPhone("");
      setSalary("");
      setDob("");
      setShiftStart("");
      setShiftEnd("");
      setAddress("");
      setAdditionalDetails("");
      setPhotoFile(null);
      setPhotoUrlPreview("");
    }
  }, [editingStaff]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setPhotoFile(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setPhotoUrlPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("role", role);
      formData.append("phone", phone);
      formData.append("salary", salary);
      formData.append("dob", dob);
      formData.append("shiftStart", shiftStart);
      formData.append("shiftEnd", shiftEnd);
      formData.append("shiftTimings", `${shiftStart} to ${shiftEnd}`);
      formData.append("address", address);
      formData.append("additionalDetails", additionalDetails);
      if (photoFile) formData.append("photo", photoFile);

      if (editingStaff && editingStaff._id) {
        await onSave(formData, true, editingStaff._id);
      } else {
        await onSave(formData, false, null);
      }
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {editingStaff ? "Edit Staff" : "Add Staff"}
        </h2>
        <button onClick={onClose} className="text-[#FF9500] hover:underline">
          ✕
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 overflow-y-auto"
      >
        <div className="flex flex-col items-center">
          <label htmlFor="staffImage" className="cursor-pointer">
            <div className="w-40 h-32 bg-[#1a1a1a] flex items-center justify-center rounded-md mb-2">
              {photoUrlPreview ? (
                <img
                  src={photoUrlPreview}
                  alt="preview"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <i className="fa-solid fa-image text-gray-500 text-2xl"></i>
              )}
            </div>
          </label>
          <input
            id="staffImage"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="text-[#FF9500] text-sm cursor-pointer hover:underline">
            Change Profile Picture
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              className="bg-[#1a1a1a] p-2 rounded-md text-sm w-full"
              placeholder="Enter full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="bg-[#1a1a1a] p-2 rounded-md text-sm w-full"
              placeholder="Enter email address"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-300">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-[#1a1a1a] p-2 rounded-md text-sm w-full"
            >
              <option>Manager</option>
              <option>Waiter</option>
              <option>Chef</option>
              <option>Cleaner</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Phone Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="Enter phone number"
              className="bg-[#1a1a1a] p-2 rounded-md text-sm w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-300">Salary</label>
            <input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              type="number"
              placeholder="Enter salary"
              className="bg-[#1a1a1a] p-2 rounded-md text-sm w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Date of Birth
            </label>
            <input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              type="date"
              className="bg-[#1a1a1a] p-2 rounded-md text-sm w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Shift Start Timing
            </label>
            <input
              value={shiftStart}
              onChange={(e) => setShiftStart(e.target.value)}
              type="time"
              className="bg-[#1a1a1a] p-2 rounded-md text-sm w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Shift End Timing
            </label>
            <input
              value={shiftEnd}
              onChange={(e) => setShiftEnd(e.target.value)}
              type="time"
              className="bg-[#1a1a1a] p-2 rounded-md text-sm w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-300">Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Enter address"
            className="bg-[#1a1a1a] p-2 rounded-md text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Additional Details
          </label>
          <textarea
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            placeholder="Enter additional details"
            rows="3"
            className="bg-[#1a1a1a] p-2 rounded-md text-sm w-full"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:underline"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="bg-[#FF9500] hover:bg-[#e68806] text-black px-4 py-2 rounded-md"
          >
            {saving ? "Saving..." : editingStaff ? "Update" : "Confirm"}
          </button>
        </div>
      </form>
    </div>
  );
}
