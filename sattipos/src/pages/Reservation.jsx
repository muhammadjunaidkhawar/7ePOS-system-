// reservation.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";

/**
 * ReservationPage (Frontend)
 *
 * - Fetches reservations from backend:
 *     GET  /api/reservations?date=YYYY-MM-DD&floor=1
 * - Creates new reservations:
 *     POST /api/reservations
 *
 * Expected reservation shape (from backend):
 * {
 *   _id: string,
 *   name: "John Doe",
 *   table: "A2",
 *   floor: 1,
 *   date: "2024-03-28",   // ISO date (YYYY-MM-DD)
 *   time: "13:00",        // "HH:mm" 24h
 *   duration: 2,          // integer number of time columns to span (hours)
 *   guests: 2,
 *   color: "#FF9500"      // optional
 *   status: "Confirmed"   // optional
 *   contact: { phone, email }
 * }
 *
 * This file preserves the original logic and UI layout but adds:
 *  - clickable reservation boxes in the grid
 *  - an in-screen Reservation Details panel (keeps navbar/sidebar as-is)
 *  - handlers to view, edit (basic), and delete a reservation
 *
 * Keep your backend routes intact: GET /api/reservations, POST /api/reservations,
 * PUT /api/reservations/:id, DELETE /api/reservations/:id
 */

export default function ReservationPage() {
  const navigate = useNavigate();

  // UI / selection state
  const [activeFloor, setActiveFloor] = useState(1); // 1 / 2 / 3
  const [showAddReservation, setShowAddReservation] = useState(false);
  const [showReservationDetails, setShowReservationDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    // default to today in YYYY-MM-DD
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  // Data
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Selected reservation for details panel (full object)
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Time columns
  const times = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  // Tables per floor
  const tablesByFloor = {
    1: ["Bar", "A1", "A2", "B1", "B2", "B3", "C1", "C2"],
    2: ["Bar", "D1", "D2", "E1", "E2", "E3", "F1", "F2"],
    3: ["Bar", "G1", "G2", "H1", "H2", "H3", "I1", "I2"],
  };

  // Form state for Add Reservation
  const defaultForm = {
    table: tablesByFloor[1][0],
    pax: 1,
    date: selectedDate,
    time: "13:00",
    duration: 1,
    deposit: "",
    status: "Confirmed",
    title: "Mr",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    paymentMethod: "Cash",
    floor: 1,
  };

  const [form, setForm] = useState({ ...defaultForm });

  useEffect(() => {
    // update table list & floor in form when floor or date changes
    setForm((f) => ({
      ...f,
      table: tablesByFloor[activeFloor][0],
      floor: activeFloor,
      date: selectedDate,
    }));
    loadReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFloor, selectedDate]);

  // Helper: load reservations from backend for selected date and floor
  async function loadReservations() {
    setLoading(true);
    setError("");
    try {
      // Example API: GET /api/reservations?date=YYYY-MM-DD&floor=1
      const query = new URLSearchParams({
        date: selectedDate,
        floor: String(activeFloor),
      });
      const res = await fetch(`/api/reservations?${query.toString()}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `Failed to fetch reservations: ${res.status} ${res.statusText} ${text}`
        );
      }
      const data = await res.json();
      // Map or normalize reservations if necessary (ensure time, duration, table, guests exist)
      const normalized = (data || []).map((r) => ({
        _id: r._id || r.id,
        name:
          r.name ||
          `${r.firstName || ""} ${r.lastName || ""}`.trim() ||
          "Guest",
        table: r.table,
        floor: r.floor || activeFloor,
        date: r.date,
        time: r.time,
        duration: Number(r.duration) || 1,
        guests: Number(r.guests) || Number(r.pax) || 1,
        color:
          r.color ||
          (r.status === "Confirmed"
            ? "#FF9500"
            : r.status === "Pending"
            ? "#f59e0b"
            : "#6b7280"),
        status: r.status || "Confirmed",
        contact: r.contact || { phone: r.phone, email: r.email },
        deposit: r.deposit || 0,
        paymentMethod: r.paymentMethod || r.payment || "Cash",
        raw: r, // keep original if needed
      }));
      setReservations(normalized);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error loading reservations");
    } finally {
      setLoading(false);
    }
  }

  // Save new reservation
  async function handleSaveReservation() {
    setError("");

    // basic validation
    if (!form.table) {
      setError("Please select a table.");
      return;
    }
    if (!form.date) {
      setError("Please select a date.");
      return;
    }
    if (!form.time) {
      setError("Please select a time.");
      return;
    }
    if (!times.includes(form.time)) {
      setError("Time must be one of the schedule times.");
      return;
    }

    // Build payload expected by backend
    const payload = {
      name: `${form.title} ${form.firstName} ${form.lastName}`.trim(),
      table: form.table,
      floor: form.floor,
      date: form.date,
      time: form.time,
      duration: Number(form.duration),
      guests: Number(form.pax),
      deposit: form.deposit ? Number(form.deposit) : 0,
      status: form.status,
      contact: {
        phone: form.phone,
        email: form.email,
      },
      paymentMethod: form.paymentMethod,
    };

    try {
      // POST to backend
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to save reservation: ${res.status} ${text}`);
      }
      const saved = await res.json();

      // Optimistic UI: append saved reservation and close side panel
      setReservations((prev) => [
        ...prev,
        {
          _id: saved._id || saved.id,
          name: saved.name || payload.name,
          table: saved.table,
          floor: saved.floor,
          date: saved.date,
          time: saved.time,
          duration: saved.duration,
          guests: saved.guests,
          color: saved.color || "#FF9500",
          status: saved.status,
          contact: saved.contact || payload.contact,
          deposit: saved.deposit || payload.deposit,
          paymentMethod: saved.paymentMethod || payload.paymentMethod,
          raw: saved,
        },
      ]);
      setShowAddReservation(false);

      // reset form to defaults for the current floor and date
      setForm((f) => ({
        ...defaultForm,
        table: tablesByFloor[activeFloor][0],
        floor: activeFloor,
        date: selectedDate,
      }));
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save reservation");
    }
  }

  // Delete reservation
  async function handleDeleteReservation(id) {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this reservation?")) return;
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to delete reservation: ${res.status} ${text}`);
      }
      // refresh list
      await loadReservations();
      setShowReservationDetails(false);
      setSelectedReservation(null);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete reservation");
    }
  }

  // Update reservation (basic: status or table change)
  async function handleUpdateReservation(id, updates = {}) {
    if (!id) return;
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to update reservation: ${res.status} ${text}`);
      }
      const updated = await res.json();
      // update local list
      setReservations((prev) =>
        prev.map((r) => (r._id === updated._id ? { ...r, ...updated } : r))
      );
      // refresh selected
      setSelectedReservation((s) =>
        s && s._id === updated._id ? { ...s, ...updated } : s
      );
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update reservation");
    }
  }

  // Helper to render reservation item
  function renderReservationBlock(reservation) {
    const colorClassStyle = {
      backgroundColor: reservation.color || "#FF9500",
      cursor: "pointer",
    };

    return (
      <div
        key={reservation._id}
        onClick={() => {
          setSelectedReservation(reservation);
          setShowReservationDetails(true);
        }}
        className="relative text-white rounded-md p-2 border border-gray-600 hover:shadow-lg"
        style={{
          gridColumn: `span ${Math.max(1, Number(reservation.duration) || 1)}`,
          ...colorClassStyle,
        }}
        title={`${reservation.name} • ${reservation.guests} pax • ${reservation.time}`}
      >
        <p className="text-xs font-medium truncate">{reservation.name}</p>
        <div className="flex items-center gap-1 text-xs mt-1">
          <span>👥</span>
          <span>{reservation.guests}</span>
        </div>
      </div>
    );
  }

  // Helper: find reservation that starts at this table/time
  function findReservationForCell(table, time) {
    return reservations.find((r) => r.table === table && r.time === time);
  }

  // Logout handler
  const handleLogout = () => {
    navigate("/");
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
        <div className="flex items-center justify-between p-4 rounded-lg mb-6 shadow ">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#FF9500] transition"
            >
              <i className="fa-solid fa-chevron-left text-white"></i>
            </button>
            <h1 className="text-xl font-semibold">Reservation</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <i
                className="fa-solid fa-bell text-xl text-white"
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

        {/* Reservation Main Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            {[1, 2, 3].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFloor(f)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeFloor === f
                    ? "bg-[#FF9500] text-black"
                    : "bg-[#2a2a2a] text-gray-300"
                }`}
              >
                {f === 1 ? "1st Floor" : f === 2 ? "2nd Floor" : "3rd Floor"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-[#2a2a2a] text-white px-3 py-2 rounded-md"
            />
            <button
              onClick={() => setShowAddReservation(true)}
              className="bg-[#FF9500] text-white px-4 py-2 rounded-md"
            >
              Add New Reservation
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">Loading reservations...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-400">Error: {error}</div>
          ) : (
            <div className="grid grid-cols-[100px_repeat(11,1fr)] text-sm">
              {/* Time Header */}
              <div className="bg-[#1f1f1f]" />
              {times.map((time, i) => (
                <div
                  key={i}
                  className="bg-[#1f1f1f] text-center py-2 border border-gray-700"
                >
                  {time}
                </div>
              ))}

              {/* Table Rows */}
              {tablesByFloor[activeFloor].map((table) => (
                <div key={table} className="contents">
                  <div className="bg-[#1f1f1f] text-center py-2 border border-gray-700 font-medium">
                    {table}
                  </div>

                  {times.map((time, i) => {
                    const reservation = findReservationForCell(table, time);

                    if (reservation) {
                      // Use helper to render clickable reservation block
                      // ensure key is unique per cell (reservation._id + time)
                      return (
                        <div
                          key={`${reservation._id}_${time}`}
                          className="contents"
                        >
                          {renderReservationBlock(reservation)}
                        </div>
                      );
                    }

                    // empty timeslot cell
                    return (
                      <div
                        key={i}
                        className="border border-gray-700 min-h-[60px]"
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Reservation Panel */}
      <div
        className={`fixed top-0 right-0 w-[420px] h-full bg-[#2a2a2a] text-white shadow-2xl z-40 overflow-y-auto rounded-l-3xl transform transition-transform duration-500 ease-in-out ${
          showAddReservation ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Add New Reservation</h2>
            <button
              onClick={() => setShowAddReservation(false)}
              className="text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          <div className="border-t border-gray-700" />

          {/* Error */}
          {error && <div className="text-red-400 text-sm">{error}</div>}

          {/* Reservation Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400">
              Reservation Details
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-white mb-1 block">Floor</label>
                <select
                  value={form.floor}
                  onChange={(e) => {
                    const newFloor = Number(e.target.value);
                    setForm((f) => ({
                      ...f,
                      floor: newFloor,
                      table: tablesByFloor[newFloor][0],
                    }));
                    setActiveFloor(Number(e.target.value));
                  }}
                  className="w-full bg-[#1a1a1a] p-3 rounded-md text-sm"
                >
                  <option value={1}>1st Floor</option>
                  <option value={2}>2nd Floor</option>
                  <option value={3}>3rd Floor</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-white mb-1 block">
                  Table Number
                </label>
                <select
                  value={form.table}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, table: e.target.value }))
                  }
                  className="w-full bg-[#1a1a1a] p-3 rounded-md text-sm"
                >
                  {tablesByFloor[form.floor].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-white mb-1 block">
                  Pax Number
                </label>
                <select
                  value={form.pax}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, pax: Number(e.target.value) }))
                  }
                  className="w-full bg-[#1a1a1a] p-3 rounded-md text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "person" : "persons"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-white mb-1 block">
                  Reserve Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  className="w-full bg-[#1a1a1a] p-3 rounded-md text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-white mb-1 block">
                  Reservation Time
                </label>
                <select
                  value={form.time}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, time: e.target.value }))
                  }
                  className="w-full bg-[#1a1a1a] p-3 rounded-md text-sm"
                >
                  {times.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-white mb-1 block">
                  Duration (hours)
                </label>
                <select
                  value={form.duration}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, duration: Number(e.target.value) }))
                  }
                  className="w-full bg-[#1a1a1a] p-3 rounded-md text-sm"
                >
                  {[1, 2, 3, 4].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-white mb-1 block">
                  Deposit Fee
                </label>
                <input
                  value={form.deposit}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, deposit: e.target.value }))
                  }
                  className="w-full bg-[#1a1a1a] p-3 rounded-md text-sm"
                  placeholder="60.00"
                />
              </div>

              <div>
                <label className="text-xs text-white mb-1 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: e.target.value }))
                  }
                  className="w-full bg-[#1a1a1a] p-3 rounded-md text-sm"
                >
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700" />

          {/* Customer Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400">
              Customer Details
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-white mb-1 block">Title</label>
                <select
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="w-full bg-[#1a1a1a] p-3 rounded-md text-sm"
                >
                  <option>Mr</option>
                  <option>Ms</option>
                </select>
              </div>

              <div></div>

              <div>
                <label className="text-xs text-white mb-1 block">
                  First Name
                </label>
                <input
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, firstName: e.target.value }))
                  }
                  className="w-full bg-[#1a1a1a] p-3 rounded-md text-sm"
                  placeholder="Watson"
                />
              </div>

              <div>
                <label className="text-xs text-white mb-1 block">
                  Last Name
                </label>
                <input
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, lastName: e.target.value }))
                  }
                  className="w-full bg-[#1a1a1a] p-3 rounded-md text-sm"
                  placeholder="Joyce"
                />
              </div>

              <div>
                <label className="text-xs text-white mb-1 block">
                  Phone Number
                </label>
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="w-full bg-[#1a1a1a] p-3 rounded-md text-sm"
                  placeholder="+1 (123) 123 4654"
                />
              </div>

              <div>
                <label className="text-xs text-white mb-1 block">
                  Email Address
                </label>
                <input
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full bg-[#1a1a1a] p-3 rounded-md text-sm"
                  placeholder="watsonjoyce112@gmail.com"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700" />

          {/* Additional Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400">
              Additional Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF9500] flex items-center justify-center text-black font-bold">
                  i
                </div>
                <div className="flex-1">
                  <div className="text-sm">Customer ID</div>
                  <div className="text-xs text-gray-300">#auto-generated</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF9500] flex items-center justify-center text-black font-bold">
                  $
                </div>
                <div className="flex-1">
                  <div className="text-sm">Payment Method</div>
                  <select
                    value={form.paymentMethod}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, paymentMethod: e.target.value }))
                    }
                    className="w-full bg-[#1a1a1a] p-2 rounded-md text-sm mt-1"
                  >
                    <option>Cash</option>
                    <option>Card</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => {
                setShowAddReservation(false);
                setError("");
              }}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveReservation}
              className="bg-[#FF9500] text-black px-5 py-2 rounded-md hover:bg-[#e68900]"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Reservation Details Panel */}
      {/* Reservation Details Panel */}
      <div
        className={`fixed top-0 right-0 w-[540px] h-full bg-[#0e0e0e]/95 backdrop-blur-xl text-white shadow-[0_0_20px_rgba(255,149,0,0.15)] z-50 overflow-y-auto rounded-l-[2rem] transform transition-transform duration-500 ease-in-out border-l border-[#2a2a2a] ${
          showReservationDetails ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-[#FF9500] tracking-wide">
                Reservation Details
              </h2>
              <div className="text-xs text-gray-400 mt-1">
                Detailed view of selected reservation
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (!selectedReservation) return;
                  const newStatus =
                    selectedReservation.status === "Confirmed"
                      ? "Pending"
                      : "Confirmed";
                  handleUpdateReservation(selectedReservation._id, {
                    status: newStatus,
                  });
                }}
                className="px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#2a2a2a] to-[#1f1f1f] hover:from-[#FF9500]/20 hover:to-[#2a2a2a] border border-[#333] transition-all"
              >
                Toggle Status
              </button>

              <button
                onClick={() => {
                  setShowReservationDetails(false);
                  setSelectedReservation(null);
                }}
                className="text-gray-400 hover:text-[#FF9500] text-2xl transition-all"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Card Section */}
          <div className="rounded-2xl overflow-hidden border border-[#2a2a2a] shadow-inner bg-[#141414]">
            {/* Header Image */}
            <div className="h-36 bg-[url('https://images.unsplash.com/photo-1599458252573-56ae36120de1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMHRhYmxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600')] bg-cover bg-center relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/70 via-transparent to-transparent"></div>
            </div>

            <div className="p-5 space-y-5">
              {/* Table and Status */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400">Table</div>
                  <div className="text-lg font-semibold text-white">
                    {selectedReservation ? selectedReservation.table : "--"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Status</div>
                  <div
                    className={`text-lg font-semibold ${
                      selectedReservation?.status === "Confirmed"
                        ? "text-[#FF9500]"
                        : "text-gray-400"
                    }`}
                  >
                    {selectedReservation ? selectedReservation.status : "--"}
                  </div>
                </div>
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-400">Date</div>
                  <div>
                    {selectedReservation ? selectedReservation.date : "--"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Time</div>
                  <div>
                    {selectedReservation ? selectedReservation.time : "--"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Guests</div>
                  <div>
                    {selectedReservation ? selectedReservation.guests : "--"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Duration</div>
                  <div>
                    {selectedReservation
                      ? selectedReservation.duration + " hr(s)"
                      : "--"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Deposit</div>
                  <div>
                    {selectedReservation
                      ? `$${(selectedReservation.deposit || 0).toFixed(2)}`
                      : "--"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Payment</div>
                  <div>
                    {selectedReservation
                      ? selectedReservation.paymentMethod
                      : "--"}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#2a2a2a] my-4" />

              {/* Customer Info */}
              <div>
                <div className="text-xs text-gray-400 mb-2">Customer</div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9500] to-[#ff6600] flex items-center justify-center text-black font-extrabold text-lg shadow-[0_0_10px_rgba(255,149,0,0.4)]">
                    {selectedReservation
                      ? (selectedReservation.name || "G").charAt(0)
                      : "G"}
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {selectedReservation ? selectedReservation.name : "--"}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {selectedReservation && selectedReservation.contact
                        ? `${selectedReservation.contact.phone || "--"} • ${
                            selectedReservation.contact.email || "--"
                          }`
                        : "--"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#2a2a2a] my-4" />

              {/* Meta Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="text-gray-400">Reservation ID</div>
                  <div className="font-medium">
                    {selectedReservation ? selectedReservation._id : "--"}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-gray-400">Floor</div>
                  <div className="font-medium">
                    {selectedReservation ? selectedReservation.floor : "--"}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-gray-400">Created At</div>
                  <div className="font-medium">
                    {selectedReservation?.raw?.createdAt
                      ? new Date(
                          selectedReservation.raw.createdAt
                        ).toLocaleString()
                      : "--"}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#2a2a2a] my-4" />

              {/* Buttons */}
              <div className="flex justify-between items-center gap-3">
                <button
                  onClick={() => {
                    if (!selectedReservation) return;
                    const newTable = prompt(
                      "Change table to:",
                      selectedReservation.table
                    );
                    if (newTable && newTable !== selectedReservation.table) {
                      handleUpdateReservation(selectedReservation._id, {
                        table: newTable,
                      });
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] hover:from-[#FF9500]/20 hover:to-[#2a2a2a] border border-[#333] transition-all font-medium"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (!selectedReservation) return;
                    const newTable = prompt(
                      "Move to table:",
                      selectedReservation.table
                    );
                    if (newTable && newTable !== selectedReservation.table) {
                      handleUpdateReservation(selectedReservation._id, {
                        table: newTable,
                      });
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-[#2b2b2b] transition-all font-medium"
                >
                  Change Table
                </button>

                <button
                  onClick={() => {
                    if (!selectedReservation) return;
                    handleDeleteReservation(selectedReservation._id);
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff3b3b] to-[#cc0000] hover:opacity-90 text-white font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Footer Hint */}
          <div className="text-xs text-gray-500 text-center">
            Tip: Click any reservation in the grid to open details here.
          </div>
        </div>
      </div>
    </div>
  );
}
