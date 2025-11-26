// src/pages/Inventory.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

export default function Inventory() {
  const navigate = useNavigate();
  const [showAddInventory, setShowAddInventory] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // if set => edit mode
  const [selectedPreview, setSelectedPreview] = useState(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [form, setForm] = useState({
    name: "",
    category: "",
    unit: "Piece",
    stock: 0,
    status: "Active",
    price: 0,
    perishable: false,
    imageFile: null, // File
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/inventory");
      setProducts(res.data);
    } catch (err) {
      console.error("fetch inventory error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to login
  };

  // open Add panel (clear form)
  const openAdd = () => {
    setEditingItem(null);
    setForm({
      name: "",
      category: "",
      unit: "Piece",
      stock: "",
      status: "Active",
      price: "",
      perishable: false,
      imageFile: null,
    });
    setSelectedPreview(null);
    setShowAddInventory(true);
  };

  // open Edit panel
  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name || "",
      category: item.category || "",
      unit: item.unit || "Piece",
      stock: item.stock || 0,
      status: item.status || "Active",
      price: item.price || 0,
      perishable: item.perishable || false,
      imageFile: null, // if user uploads new image, will replace
    });
    setSelectedPreview(
      item.image ? `http://localhost:5000/uploads/${item.image}` : null
    );
    setShowAddInventory(true);
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setForm((p) => ({ ...p, imageFile: f }));
      setSelectedPreview(URL.createObjectURL(f));
    }
  };

  const handleFormChange = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  // submit add or edit
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("category", form.category);
      fd.append("unit", form.unit);
      fd.append("stock", form.stock);
      fd.append("status", form.status);
      fd.append("price", form.price);
      fd.append("perishable", form.perishable ? "true" : "false");
      if (form.imageFile) fd.append("image", form.imageFile);

      if (editingItem) {
        // PUT
        const res = await axios.put(
          `http://localhost:5000/api/inventory/${editingItem._id}`,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        // update in state
        setProducts((prev) =>
          prev.map((p) => (p._id === res.data._id ? res.data : p))
        );
      } else {
        // POST
        const res = await axios.post(
          "http://localhost:5000/api/inventory",
          fd,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setProducts((prev) => [res.data, ...prev]);
      }

      setShowAddInventory(false);
      setEditingItem(null);
      setSelectedPreview(null);
    } catch (err) {
      console.error("save inventory error:", err);
      alert(err?.response?.data?.message || "Save failed");
    }
  };

  // delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this inventory item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/inventory/${id}`);
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error("delete error:", err);
      alert("Delete failed");
    }
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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#FF9500] transition"
            >
              <i className="fa-solid fa-chevron-left text-white"></i>
            </button>
            <h1 className="text-xl font-semibold">Inventory</h1>
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

        {/* Total Products */}
        <p className="text-lg mb-5">
          <span className="text-white">{products.length} total products</span>
          <button
            onClick={openAdd}
            className="bg-[#FF9500] ml-184 hover:bg-[#e68806] text-black px-4 py-2 text-sm rounded-md"
          >
            Add New Inventory
          </button>
        </p>

        <div className="flex gap-6">
          {/* Products List */}
          <div className="flex-1 space-y-3 ">
            {loading ? (
              <div>Loading...</div>
            ) : products.length === 0 ? (
              <div className="text-gray-400">No products</div>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between  border-gray-700 hover:bg-[#2f2f2f] p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        product.image
                          ? `http://localhost:5000/uploads/${product.image}`
                          : product.img || "https://via.placeholder.com/60"
                      }
                      alt={product.name}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-400">
                        Stocked Product: {product.stock} In Stock
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 text-sm">
                    <div>
                      <p className="text-gray-400">Status</p>
                      <p className="text-green-500 font-medium">
                        {product.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Category</p>
                      <p>{product.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Retail Price</p>
                      <p className="font-medium">
                        ${(product.price || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 text-sm">
                    <button
                      onClick={() => openEdit(product)}
                      className="fa-solid fa-pen text-[#ffffff] cursor-pointer px-3 py-2 bg-[#2a2a2a] rounded"
                    ></button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="fa-solid fa-trash text-red-500 cursor-pointer px-3 py-2 bg-[#2a2a2a] rounded"
                    ></button>
                  </div>
                </div>
              ))
            )}

            {/* Add/Edit Inventory Panel */}
            {showAddInventory && (
              <div
                className="absolute top-0 right-0 w-[35%] h-full bg-[#1a1a1a] shadow-xl border-l border-gray-800 p-8 overflow-y-auto transition-all duration-500 ease-in-out rounded-l-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
                  <h2 className="text-xl font-semibold text-[#FF9500]">
                    {editingItem ? "Edit Inventory" : "Add New Inventory"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddInventory(false);
                      setEditingItem(null);
                      setSelectedPreview(null);
                    }}
                    className="text-[#FF9500] hover:text-white text-xl transition-all"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-5">
                  {/* Image Upload */}
                  <div className="flex flex-col items-center">
                    <div className="w-44 h-36 bg-[#2a2a2a] flex items-center justify-center rounded-xl mb-3 overflow-hidden border border-gray-700 shadow-md">
                      {selectedPreview ? (
                        <img
                          src={selectedPreview}
                          alt="Selected"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <i className="fa-solid fa-image text-gray-500 text-3xl"></i>
                      )}
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      id="imageInput"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="imageInput"
                      className="bg-[#FF9500] hover:bg-[#e68806] px-4 py-1 rounded-full text-black text-sm font-medium cursor-pointer transition-all"
                    >
                      Upload Image
                    </label>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-xs mb-2 block">
                        NAME
                      </label>
                      <input
                        type="text"
                        placeholder="Enter inventory name"
                        value={form.name}
                        onChange={(e) =>
                          handleFormChange("name", e.target.value)
                        }
                        className="bg-[#2a2a2a] p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-[#FF9500] outline-none transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-white text-xs mb-2 block">
                        CATEGORY
                      </label>
                      <input
                        type="text"
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) =>
                          handleFormChange("category", e.target.value)
                        }
                        className="bg-[#2a2a2a] p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-[#FF9500] outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="text-white text-xs mb-2 block">
                        QUANTITY
                      </label>
                      <input
                        type="number"
                        value={form.stock}
                        onChange={(e) =>
                          handleFormChange("stock", Number(e.target.value))
                        }
                        className="bg-[#2a2a2a] p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-[#FF9500] outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="text-white text-xs mb-2 block">
                        STOCK
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) =>
                          handleFormChange("status", e.target.value)
                        }
                        className="bg-[#2a2a2a] p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-[#FF9500] outline-none transition"
                      >
                        <option>InStock</option>
                        <option>Out Of Stock</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-white text-xs mb-2 block">
                      STATUS
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) =>
                        handleFormChange("status", e.target.value)
                      }
                      className="bg-[#2a2a2a] p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-[#FF9500] outline-none transition"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Draft</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-white text-xs mb-2 block">
                      PRICE
                    </label>
                    <input
                      type="number"
                      placeholder="Enter price"
                      value={form.price}
                      onChange={(e) =>
                        handleFormChange("price", Number(e.target.value))
                      }
                      className="bg-[#2a2a2a] p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-[#FF9500] outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-white">Perishable</label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="perishable"
                          checked={form.perishable === true}
                          onChange={() => handleFormChange("perishable", true)}
                          className="accent-[#FF9500]"
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="perishable"
                          checked={form.perishable === false}
                          onChange={() => handleFormChange("perishable", false)}
                          className="accent-[#FF9500]"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddInventory(false);
                        setEditingItem(null);
                        setSelectedPreview(null);
                      }}
                      className="text-gray-400 hover:text-white text-sm font-medium underline-offset-2 hover:underline transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#FF9500] hover:bg-[#e68806] text-black px-6 py-2 rounded-md text-sm font-semibold shadow-md transition-all"
                    >
                      {editingItem ? "Save Changes" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
