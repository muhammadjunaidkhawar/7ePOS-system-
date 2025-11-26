import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import AddNewCategory from "./AddNewCategory";
import AddMenuItem from "./AddMenuItem";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [menuType, setMenuType] = useState("Normal Menu"); // ✅ for filtering
  const [editItem, setEditItem] = useState(null); // ✅ to hold item for editing

  const navigate = useNavigate();

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        const all = {
          name: "All",
          count: res.data.length,
          icon: "fa-solid fa-list",
        };
        const remote = res.data.map((c) => ({
          name: c.name,
          count: c.items || 0,
          icon: c.iconClass || "fa-solid fa-list",
        }));
        setCategories([all, ...remote]);
      } catch (err) {
        console.error("fetch categories:", err);
        setCategories([
          { name: "All", count: 8, icon: "fa-solid fa-list" },
          { name: "Chicken", count: 2, icon: "fa-solid fa-drumstick-bite" },
          { name: "Pizza", count: 1, icon: "fa-solid fa-pizza-slice" },
          { name: "Burger", count: 1, icon: "fa-solid fa-burger" },
        ]);
      }
    };
    fetchCats();
  }, []);

  // ✅ Fetch menu items
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/menu");
        setMenuItems(res.data);
      } catch (err) {
        console.error("fetch menu error:", err);
      }
    };
    fetchMenu();
  }, []);

  // ✅ When new category saved
  const handleNewCategorySaved = (cat) => {
    setCategories((prev) => {
      const exists = prev.some((p) => p.name === cat.name);
      if (exists) return prev;
      const newItem = {
        name: cat.name,
        count: cat.items || 0,
        icon: cat.iconClass || "fa-solid fa-list",
      };
      return [prev[0], newItem, ...prev.slice(1)];
    });
    setSelectedCategory(cat.name);
    setShowAddCategory(false);
  };

  // ✅ When new or edited item saved
  const handleNewItemSaved = (newItem) => {
    if (editItem) {
      setMenuItems((prev) =>
        prev.map((item) => (item._id === newItem._id ? newItem : item))
      );
    } else {
      setMenuItems((prev) => [newItem, ...prev]);
    }
    setShowAddItem(false);
    setEditItem(null);
  };

  // ✅ Delete item
  const handleDeleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      setMenuItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting item");
    }
  };

  // ✅ Edit item
  const handleEditItem = (item) => {
    setEditItem(item);
    setShowAddItem(true);
  };

  const handleLogout = () => {
    navigate("/");
  };

  // ✅ Filter by category and menu type
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesType = item.menuType === menuType || !item.menuType;
    return matchesCategory && matchesType;
  });

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((item) => item._id));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleItemSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
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
        {/* Header */}
        <div className="flex items-center justify-between p-4 rounded-lg mb-6 shadow">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#FF9500] transition"
            >
              <i className="fa-solid fa-chevron-left text-white"></i>
            </button>
            <h1 className="text-xl font-semibold">Menu</h1>
          </div>

          <div className="flex items-center gap-6">
            <i
              className="fa-solid fa-bell text-xl text-white cursor-pointer"
              onClick={() => navigate("/notification")}
            ></i>
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

        {/* Categories */}
        <div className="flex justify-between items-center mb-4">
          <h2>Categories</h2>
          <button
            onClick={() => setShowAddCategory(true)}
            className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#e68806] rounded-lg text-white text-sm"
          >
            Add New Category
          </button>
        </div>

        <div className="flex gap-4 my-3">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex-1 relative py-15 rounded-xl cursor-pointer transition-colors duration-300 ${
                selectedCategory === cat.name
                  ? "bg-[#FF9500] text-black"
                  : "bg-[#2a2a2a] text-white hover:bg-[#FF9500] hover:text-black"
              }`}
            >
              <i
                className={`${cat.icon} absolute top-3 right-3 text-xl ${
                  selectedCategory === cat.name
                    ? "text-black"
                    : "text-[#FF9500]"
                }`}
              ></i>

              <div className="absolute bottom-3 left-3 text-left">
                <h3 className="font-normal text-sm">{cat.name}</h3>
                <p className="text-xs">{cat.count} items</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-left text-white mb-4">Special Menu all item</p>

        {/* Tabs for Menu Type */}
        <div className="flex gap-3 mb-4">
          {[
            "Normal Menu",
            "Special Deals",
            "New Year Special",
            "Desserts & Drinks",
          ].map((type) => (
            <button
              key={type}
              onClick={() => setMenuType(type)}
              className={`px-3 py-1 text-sm rounded-lg ${
                menuType === type
                  ? "bg-[#FF9500] text-black"
                  : "bg-[#2a2a2a] hover:bg-[#e68806]"
              }`}
            >
              {type}
            </button>
          ))}
          <button
            onClick={() => {
              setEditItem(null);
              setShowAddItem(true);
            }}
            className="px-4 py-2 text-sm bg-[#2a2a2a] ml-87 hover:bg-[#e68806] rounded-lg"
          >
            Add Menu Item
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#000000] text-white text-left text-sm">
                <th className="p-3 flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-[#FF9500] w-4 h-4"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                  Product
                </th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Item ID</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Availability</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-700 hover:bg-[#2f2f2f]"
                >
                  <td className="p-3 flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="accent-[#FF9500] w-4 h-4"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleItemSelect(item._id)}
                    />
                    <img
                      src={
                        item.image
                          ? `http://localhost:5000/uploads/${item.image}`
                          : "https://via.placeholder.com/60"
                      }
                      alt="food"
                      className="w-12 h-12 rounded-md"
                    />
                  </td>
                  <td className="p-3 text-sm">{item.productName}</td>
                  <td className="p-3 text-sm">{item.itemId}</td>
                  <td className="p-3 text-sm text-gray-300 hover:text-white hover:font-bold">
                    {item.stock} items
                  </td>
                  <td className="p-3 text-sm">{item.category}</td>
                  <td className="p-3 text-sm">${item.price}</td>
                  <td
                    className={`p-3 text-sm ${
                      item.availability === "Available"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.availability}
                  </td>
                  <td className="p-3 flex gap-3 items-center">
                    <button
                      title="Edit Item"
                      onClick={() => handleEditItem(item)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-[#2E8BFD] to-[#1E62D0] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95"
                    >
                      <i className="fa-solid fa-pen text-sm"></i>
                    </button>

                    <button
                      title="Delete Item"
                      onClick={() => handleDeleteItem(item._id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95"
                    >
                      <i className="fa-solid fa-trash text-sm"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Overlay */}
      {showAddCategory && (
        <AddNewCategory
          onClose={() => setShowAddCategory(false)}
          onSave={handleNewCategorySaved}
        />
      )}

      {/* Add/Edit Menu Item Overlay */}
      {showAddItem && (
        <AddMenuItem
          onClose={() => {
            setShowAddItem(false);
            setEditItem(null);
          }}
          onSave={handleNewItemSaved}
          existingItem={editItem}
        />
      )}
    </div>
  );
}
