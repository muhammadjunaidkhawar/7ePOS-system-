// src/pages/Order.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

export default function Order() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [showOrderPanel, setShowOrderPanel] = useState(false);
  const [showTipPopup, setShowTipPopup] = useState(false);

  // backend data
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [search, setSearch] = useState("");

  // panel form state (used for add & edit)
  const emptyForm = {
    _id: null,
    customerName: "",
    tableNo: "",
    items: [{ qty: 1, item: "", price: "" }],
    paymentMethod: "Cash",
    notes: "",
    tip: "",
    status: "In Process",
  };
  const [form, setForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  // fetch orders from backend
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const q = search ? `&q=${encodeURIComponent(search)}` : "";
      const statusQuery =
        activeTab && activeTab !== "All"
          ? `?status=${encodeURIComponent(activeTab)}`
          : "?";
      const res = await axios.get(
        `http://localhost:5000/api/orders${statusQuery}${q}`
      );
      setOrders(res.data || []);
    } catch (err) {
      console.error("fetch orders error:", err);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  // open panel for new order
  const openNewOrderPanel = () => {
    setForm(emptyForm);
    setShowOrderPanel(true);
  };

  // open panel for editing an order
  const openEditPanel = (order) => {
    // convert numbers safely
    const safeOrder = {
      ...order,
      tableNo: order.tableNo ?? "",
      tip: order.tip ?? 0,
      items:
        order.items && order.items.length
          ? order.items
          : [{ qty: 1, item: "", price: 0 }],
    };
    setForm(safeOrder);
    setShowOrderPanel(true);
  };

  // close panel
  const closePanel = () => {
    setShowOrderPanel(false);
    setForm(emptyForm);
  };

  // handle form field changes
  const handleFormChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  // items handlers
  const updateItem = (index, key, value) => {
    setForm((p) => {
      const items = [...(p.items || [])];
      items[index] = {
        ...items[index],
        [key]: key === "qty" || key === "price" ? Number(value) : value,
      };
      return { ...p, items };
    });
  };
  const addItemRow = () =>
    setForm((p) => ({
      ...p,
      items: [...(p.items || []), { qty: 1, item: "", price: 0 }],
    }));
  const removeItemRow = (i) =>
    setForm((p) => ({ ...p, items: p.items.filter((_, idx) => idx !== i) }));

  // save (create or update)
  const handleSaveOrder = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      // compute subtotal, total on backend too but we can send items & tip
      const payload = {
        customerName: form.customerName,
        tableNo: form.tableNo ? Number(form.tableNo) : undefined,
        items: form.items,
        paymentMethod: form.paymentMethod,
        notes: form.notes,
        tip: Number(form.tip) || 0,
        status: form.status || "In Process",
      };

      if (form._id) {
        // update
        const res = await axios.put(
          `http://localhost:5000/api/orders/${form._id}`,
          payload
        );
        // update local state
        setOrders((prev) =>
          prev.map((o) => (o._id === res.data._id ? res.data : o))
        );
      } else {
        // create
        const res = await axios.post(
          "http://localhost:5000/api/orders",
          payload
        );
        setOrders((prev) => [res.data, ...prev]);
      }

      closePanel();
    } catch (err) {
      console.error("save order error:", err);
      alert(err?.response?.data?.message || "Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  // delete order
  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error("delete error:", err);
      alert("Delete failed");
    }
  };

  // simple search debounce (quick)
  useEffect(() => {
    const t = setTimeout(() => {
      fetchOrders();
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [search]);

  const handleLogout = () => navigate("/");

  // UI helpers
  const calcSubtotal = (items) =>
    (items || []).reduce(
      (s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0),
      0
    );

  return (
    <div className="flex min-h-screen bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Sidebar */}
      <div className="w-38 rounded-3xl bg-[#2a2a2a] flex flex-col justify-between py-6">
        <div>
          <h1 className="text-md font-semibold text-[#FF9500] text-center mb-2">
            7E POS
          </h1>
          <nav className="space-y-0.5 px-8">
            {[
              { to: "/dashboard", icon: "fa-chart-line", label: "Dashboard" },
              { to: "/menu", icon: "fa-utensils", label: "Menu" },
              { to: "/staff", icon: "fa-user-group", label: "Staff" },
              {
                to: "/inventory",
                icon: "fa-boxes-stacked",
                label: "Inventory",
              },
              { to: "/reports", icon: "fa-file-lines", label: "Reports" },
              { to: "/order", icon: "fa-chair", label: "Order/Table" },
              {
                to: "/reservation",
                icon: "fa-calendar-check",
                label: "Reservation",
              },
            ].map((item, idx) => (
              <div key={idx}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1 px-1 py-2 rounded-md text-white transition-colors duration-300 ${
                      isActive
                        ? "bg-[#FF9500] text-black"
                        : "hover:bg-[#FF9500]"
                    }`
                  }
                >
                  <i
                    className={`fa-solid ${item.icon} text-sm text-[#FF9500] bg-white rounded-full p-2`}
                  ></i>
                  <span className="text-xs">{item.label}</span>
                </NavLink>
                <hr className="border-t border-white/20" />
              </div>
            ))}
          </nav>
        </div>

        {/* Logout */}
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
            <h1 className="text-xl font-semibold">Orders</h1>
          </div>

          <div className="flex items-center gap-6">
            <i
              className="fa-solid fa-bell text-xl text-white cursor-pointer"
              onClick={() => navigate("/notification")}
            ></i>
            <div className="w-px h-6 bg-white/30" />
            <Link to="/profile">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-[#FF9500] cursor-pointer"
              />
            </Link>
          </div>
        </div>

        {/* Orders Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {["All", "In Process", "Ready", "Completed", "Cancelled"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md font-normal text-sm ${
                    activeTab === tab
                      ? "bg-[#FF9500] text-black"
                      : "bg-[#2a2a2a] text-white"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-[#FF9500] text-sm text-black rounded-lg"
              onClick={openNewOrderPanel}
            >
              Add New Order
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search a name, order or etc"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#2a2a2a] text-white px-4 py-2 text-sm rounded-lg w-64 pl-10"
              />
              <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingOrders ? (
            <div>Loading...</div>
          ) : orders.length === 0 ? (
            <div className="text-gray-400">No orders found</div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#2a2a2a] rounded-xl p-4 shadow flex flex-col hover:scale-[1.02] transition-transform"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#FF9500] text-black font-semibold text-xl w-10 h-10 flex items-center justify-center rounded-md">
                      {order.tableNo !== null && order.tableNo !== undefined
                        ? order.tableNo
                        : "—"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-semibold">
                        {order.customerName}
                      </span>
                      <span className="text-xs text-gray-400">
                        Order {order._id}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full whitespace-nowrap ${
                      order.status === "Ready"
                        ? "bg-green-500/20 text-green-400"
                        : order.status === "In Process"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : order.status === "Cancelled"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                    style={{ fontSize: "0.65rem" }}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-400 border-b border-white/10 py-2">
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span>
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="mt-4 text-gray-300">
                  <div className="grid grid-cols-[50px_1fr_auto] mb-2 text-sm font-semibold text-white">
                    <span>Qty</span>
                    <span>Items</span>
                    <span className="text-right">Price</span>
                  </div>
                  {(order.items || []).map((i, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-[50px_1fr_auto] text-sm py-2 border-b border-white/10"
                    >
                      <span>{i.qty}</span>
                      <span className="truncate">{i.item}</span>
                      <span className="text-right">${i.price}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-white font-normal">Subtotal</span>
                  <span className="text-white font-normal">
                    ${order.subtotal ?? calcSubtotal(order.items)}
                  </span>
                </div>

                <div className="flex justify-between gap-2 mt-4">
                  <button
                    title="Edit"
                    onClick={() => openEditPanel(order)}
                    className="flex-1 border border-[#FF9500] text-[#FF9500] rounded-lg py-2 hover:bg-[#FF9500] hover:text-black transition"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleDeleteOrder(order._id)}
                    className="flex-1 border border-[#FF9500] text-[#FF9500] rounded-lg py-2 hover:bg-[#FF9500] hover:text-black transition"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button className="flex-[2] bg-[#FF9500] text-black rounded-lg py-2 font-medium hover:bg-[#ffb733] transition">
                    Pay Bill
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Order Panel */}
      {showOrderPanel && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/40 flex justify-end z-50"
          onClick={closePanel}
        >
          <div
            className="w-[430px] bg-[#1f1f1f]/90 backdrop-blur-lg h-full p-6 overflow-y-auto shadow-2xl border-l border-[#3a3a3a] rounded-l-2xl transform translate-x-0 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-[#FF9500] tracking-wide">
                {form._id ? "Edit Order" : "Add New Order"}
              </h2>
              <button
                onClick={closePanel}
                className="text-gray-300 hover:text-[#FF9500] transition text-xl"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveOrder} className="space-y-5">
              {/* Customer Name */}
              <div>
                <label className="block text-sm mb-1 text-gray-300">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) =>
                    handleFormChange("customerName", e.target.value)
                  }
                  placeholder="Enter Customer Name"
                  className="w-full bg-[#2b2b2b] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9500] transition"
                  required
                />
              </div>

              {/* Table No */}
              <div>
                <label className="block text-sm mb-1 text-gray-300">
                  Table No
                </label>
                <input
                  type="number"
                  value={form.tableNo}
                  onChange={(e) => handleFormChange("tableNo", e.target.value)}
                  placeholder="Enter Table No"
                  className="w-full bg-[#2b2b2b] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9500] transition"
                />
              </div>

              {/* Order Items */}
              <div>
                <label className="block text-sm mb-1 text-gray-300">
                  Order Items
                </label>
                <div className="space-y-2">
                  {form.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2 bg-[#2a2a2a] p-2 rounded-md shadow-sm border border-[#3a3a3a]"
                    >
                      <input
                        type="number"
                        value={it.qty}
                        min="1"
                        onChange={(e) => updateItem(idx, "qty", e.target.value)}
                        className="w-14 bg-[#1a1a1a] px-2 py-2 rounded-md text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#FF9500]"
                      />
                      <input
                        type="text"
                        value={it.item}
                        onChange={(e) =>
                          updateItem(idx, "item", e.target.value)
                        }
                        placeholder="Item name"
                        className="flex-1 bg-[#1a1a1a] px-2 py-2 rounded-md text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#FF9500]"
                      />
                      <input
                        type="number"
                        value={it.price}
                        min="0"
                        onChange={(e) =>
                          updateItem(idx, "price", e.target.value)
                        }
                        placeholder="Price"
                        className="w-20 bg-[#1a1a1a] px-2 py-2 rounded-md text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#FF9500]"
                      />
                      <button
                        type="button"
                        onClick={() => removeItemRow(idx)}
                        className="text-red-400 hover:text-red-500 px-2 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addItemRow}
                    className="text-sm text-[#FF9500] hover:underline"
                  >
                    + Add Item
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm mb-1 text-gray-300">
                  Payment Method
                </label>
                <select
                  value={form.paymentMethod}
                  onChange={(e) =>
                    handleFormChange("paymentMethod", e.target.value)
                  }
                  className="w-full bg-[#2b2b2b] px-3 py-2 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF9500]"
                >
                  <option>Cash</option>
                  <option>Card</option>
                  <option>Online</option>
                </select>
              </div>

              {/* Tip + Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-gray-300">
                    Tip
                  </label>
                  <input
                    type="number"
                    value={form.tip}
                    onChange={(e) =>
                      handleFormChange("tip", Number(e.target.value))
                    }
                    className="w-full bg-[#2b2b2b] px-3 py-2 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF9500]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-300">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => handleFormChange("status", e.target.value)}
                    className="w-full bg-[#2b2b2b] px-3 py-2 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF9500]"
                  >
                    <option>In Process</option>
                    <option>Ready</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-[#3a3a3a]">
                <button
                  type="button"
                  onClick={() => setShowTipPopup(true)}
                  className="text-sm bg-[#FF9500] text-black px-4 py-2 rounded-md hover:bg-[#ffa733] transition"
                >
                  Add Tip
                </button>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closePanel}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-[#FF9500] text-black px-4 py-2 rounded-md text-sm hover:bg-[#ffa733] transition"
                  >
                    {isSaving ? "Saving..." : "Save Order"}
                  </button>
                </div>
              </div>
            </form>

            {/* Tip Popup */}
            {showTipPopup && (
              <div
                className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50"
                onClick={() => setShowTipPopup(false)}
              >
                <div
                  className="bg-[#2a2a2a]/95 backdrop-blur-lg p-6 rounded-xl w-[350px] shadow-xl border border-[#3a3a3a]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-semibold text-[#FF9500] mb-4 text-center">
                    Add Tip
                  </h3>
                  <input
                    type="number"
                    value={form.tip}
                    onChange={(e) =>
                      handleFormChange("tip", Number(e.target.value))
                    }
                    placeholder="Enter tip amount"
                    className="w-full bg-[#1a1a1a] px-3 py-2 rounded-md focus:outline-none mb-4 text-gray-200 focus:ring-2 focus:ring-[#FF9500]"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-500 transition"
                      onClick={() => setShowTipPopup(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-[#FF9500] text-black px-4 py-2 rounded-md text-sm hover:bg-[#ffa733] transition"
                      onClick={() => setShowTipPopup(false)}
                    >
                      Save Tip
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
