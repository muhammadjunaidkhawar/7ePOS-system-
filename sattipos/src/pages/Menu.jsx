import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate(); //  Initialize navigation

  const categories = [
    { name: "All", count: 116, icon: "fa-solid fa-list" },
    { name: "Pizza", count: 20, icon: "fa-solid fa-pizza-slice" },
    { name: "Burger", count: 15, icon: "fa-solid fa-burger" },
    { name: "Chicken", count: 10, icon: "fa-solid fa-drumstick-bite" },
    { name: "Bakery", count: 18, icon: "fa-solid fa-bread-slice" },
    { name: "Beverage", count: 12, icon: "fa-solid fa-mug-saucer" },
    { name: "Seafood", count: 16, icon: "fa-solid fa-fish" },
  ];

  const handleLogout = () => {
    navigate("/"); // Redirect to login
  };

  const menuItems = [
    { id: "#22314644", name: "Chicken Parmesan", stock: "119 items", category: "Chicken", price: "$55.00", status: "In Stock" },
    { id: "#22314645", name: "Cheese Pizza", stock: "80 items", category: "Pizza", price: "$40.00", status: "In Stock" },
    { id: "#22314646", name: "Beef Burger", stock: "65 items", category: "Burger", price: "$25.00", status: "Out of Stock" },
    { id: "#22314647", name: "Grilled Salmon", stock: "40 items", category: "Seafood", price: "$70.00", status: "In Stock" },
    { id: "#22314647", name: "Grilled Salmon", stock: "40 items", category: "Seafood", price: "$70.00", status: "In Stock" },
    { id: "#22314647", name: "Grilled Salmon", stock: "40 items", category: "Seafood", price: "$70.00", status: "In Stock" },
    { id: "#22314647", name: "Grilled Salmon", stock: "40 items", category: "Seafood", price: "$70.00", status: "In Stock" },
    { id: "#22314647", name: "Grilled Salmon", stock: "40 items", category: "Seafood", price: "$70.00", status: "In Stock" },
  ];

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
            <span className="text-sm  mt-1">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navbar */}
        <div className="flex items-center justify-between bg-[#0d0d0d] p-4 rounded-lg mb-6 shadow">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#FF9500] transition"
            >
              <i className="fa-solid fa-chevron-left text-white"></i>
            </button>
            <h1 className="text-xl font-semibold">Menu</h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <i className="fa-solid fa-bell text-xl text-white"></i>
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

        {/* Categories Header with Button */}
        <div className="flex justify-between items-center mb-4">
          <h2>Categories</h2>
          <button className="px-4 py-2 bg-[#FF9500] hover:bg-[#e68806] rounded-lg text-black text-sm">
            Add New Category
          </button>
        </div>

        {/* Categories equal width with icons */}
        <div className="flex gap-4 my-3">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex-1 relative bg-[#2a2a2a] hover:bg-[#FF9500] hover:text-white py-15 rounded-xl cursor-pointer group "
            >
              {/* Icon at top right */}
              <i className={`${cat.icon} absolute top-3 right-3 text-xl text-[#FF9500] group-hover:text-black`}></i>

              {/* Text at bottom left */}
              <div className="absolute bottom-3 left-3 text-left">
                <h3 className="font-normal text-sm group-hover:text-black">{cat.name}</h3>
                <p className="text-xs text-gray-400 group-hover:text-black">{cat.count} items</p>
              </div>
            </div>
          ))}
        </div>

        {/* Special Menu text */}
        <p className="text-left text-gray-300 mb-4">Special Menu all item</p>

        {/* Tabs */}
        <div className="flex gap-3 mb-4">
          <button className="px-4 py-2 text-sm bg-[#FF9500] hover:bg-[#e68806] rounded-lg">Normal Menu</button>
          <button className="px-4 py-2 text-sm  bg-[#2a2a2a] hover:bg-[#e68806] rounded-lg">Special Deals</button>
          <button className="px-4 py-2 text-sm  bg-[#2a2a2a] hover:bg-[#e68806] rounded-lg">New Year Special</button>
          <button className="px-4 py-2 text-sm  bg-[#2a2a2a] hover:bg-[#e68806] rounded-lg">Deserts & Drinks</button>
          <button className="px-4 py-2 text-sm bg-[#2a2a2a] ml-82 hover:bg-[#e68806] rounded-lg">Add Menu Item</button>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#000000] text-white text-left text-sm">
                <th className="p-3">Product</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Item ID</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Availability</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-[#2f2f2f]">
                  <td className="p-3">
                    <img
                      src="https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2503,h_2503,c_limit/Smashburger-recipe-120219.jpg"
                      alt="food"
                      className="w-12 h-12 rounded-md"
                    />
                  </td>
                  <td className="p-3 text-sm">{item.name}</td>
                  <td className="p-3 text-sm">{item.id}</td>
                  <td className="p-3 text-sm text-gray-300 hover:text-white hover:font-bold">{item.stock}</td>
                  <td className="p-3 text-sm">{item.category}</td>
                  <td className="p-3 text-sm">{item.price}</td>
                  <td className={`p-3 text-sm ${item.status === "In Stock" ? "text-green-400" : "text-red-400"}`}>
                    {item.status}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button className="fa-solid fa-pen text-[#ffffff] cursor-pointer"></button>
                    <button className="fa-solid fa-trash text-red-500 cursor-pointer"></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
