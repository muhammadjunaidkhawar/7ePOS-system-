import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Inventory() {
  const navigate = useNavigate();

  // Dummy products data
  const [products] = useState([
    {
      id: 1,
      name: "Chicken Parmesan",
      stock: 10,
      status: "Active",
      category: "Chicken",
      price: 55.0,
      img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2503,h_2503,c_limit/Smashburger-recipe-120219.jpg", // replace with actual image
    },
    {
      id: 2,
      name: "Chicken Parmesan",
      stock: 10,
      status: "Active",
      category: "Chicken",
      price: 55.0,
      img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2503,h_2503,c_limit/Smashburger-recipe-120219.jpg",
    },
    {
      id: 3,
      name: "Chicken Parmesan",
      stock: 10,
      status: "Active",
      category: "Chicken",
      price: 55.0,
      img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2503,h_2503,c_limit/Smashburger-recipe-120219.jpg",
    },
    {
      id: 3,
      name: "Chicken Parmesan",
      stock: 10,
      status: "Active",
      category: "Chicken",
      price: 55.0,
      img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2503,h_2503,c_limit/Smashburger-recipe-120219.jpg",
    },

    {
      id: 3,
      name: "Chicken Parmesan",
      stock: 10,
      status: "Active",
      category: "Chicken",
      price: 55.0,
      img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2503,h_2503,c_limit/Smashburger-recipe-120219.jpg",
    },

    {
      id: 3,
      name: "Chicken Parmesan",
      stock: 10,
      status: "Active",
      category: "Chicken",
      price: 55.0,
      img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2503,h_2503,c_limit/Smashburger-recipe-120219.jpg",
    },

    {
      id: 3,
      name: "Chicken Parmesan",
      stock: 10,
      status: "Active",
      category: "Chicken",
      price: 55.0,
      img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2503,h_2503,c_limit/Smashburger-recipe-120219.jpg",
    },
    {
      id: 3,
      name: "Chicken Parmesan",
      stock: 10,
      status: "Active",
      category: "Chicken",
      price: 55.0,
      img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2503,h_2503,c_limit/Smashburger-recipe-120219.jpg",
    },
  ]);

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

          {/* Right Side */}
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

        {/* Total Products */}
        <p className="text-lg mb-5">
          <span className="text-white d">150 total products</span> 
          <button className="bg-[#FF9500] ml-184 hover:bg-[#e68806] text-black px-4 py-2 text-sm rounded-md">
              Add New Inventory
            </button>
        </p>

        <div className="flex gap-6">
          {/* Filters Section */}
          <div className="w-72 bg-[#2a2a2a] p-4 rounded-lg">
            <h2 className="text-sm font-medium mb-4">Product Status</h2>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button className="bg-[#FF9500] text-black px-3 py-2 rounded-md text-sm">
                All
                <span className=" text-[#000000] ml-15">
               150
               </span>
              </button>
              
              <button className="bg-[#1a1a1a] px-3 py-2 hover:text-black text-sm hover:bg-[#FF9500] rounded-md">Active
                <span className=" text-[#000000] ml-10">
               150
               </span>
              </button>
              <button className="bg-[#1a1a1a] px-3 py-2 hover:text-black hover:bg-[#FF9500] text-sm rounded-md">Inactive
                <span className=" text-[#000000]  ml-6">
               150
               </span>
              </button>
              <button className="bg-[#1a1a1a] px-3 py-2 text-sm hover:bg-[#FF9500] hover:text-black rounded-md">Draft
                <span className=" text-black ml-12">
               150
               </span>
              </button>
            </div>

            <div className="space-y-3">
               <h2 className="text-sm font-medium mb-4">Category</h2>
              <select className="w-full bg-[#1a1a1a] text-xs px-3 py-2 rounded-md">
                <option>All Category</option>
              </select>
             <h2 className="text-sm font-medium mb-4">Stock</h2>
              <select className="w-full bg-[#1a1a1a] text-xs px-3 py-2 rounded-md">
                <option>InStock</option>
              </select>
              <h2 className="text-sm font-medium mb-4">Value</h2>
              <select className="w-full bg-[#1a1a1a] text-xs px-3 py-2 rounded-md">
              <option>Litre</option>
              </select>
              <h2 className="text-sm font-medium mb-4">Piece/Item/Quality</h2>
              <input
                type="text"
                placeholder="50"
                className="w-full bg-[#1a1a1a] px-3 py-2 rounded-md"
              />
              <h2 className="text-sm font-medium mb-4">Price</h2>
              <div className="relative gap-2">
                <input
                  type="number"
                  placeholder="50"
                  className="w-full bg-[#1a1a1a] px-3 py-2 rounded-md"
                />
               <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#FF9500]">
               $
               </span>            
                 </div>
              <div className="relative gap-2">
                <input
                  type="number"
                  placeholder="120"
                  className="w-full bg-[#1a1a1a] px-3 py-2 rounded-md "
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#FF9500]">
               $
               </span> 
              </div>
            </div>

            <button className="w-full h-14 mt-12 bg-[#FF9500] hover:bg-[#e68806] text-black font-medium px-3 py-2 rounded-md">
              Reset Filters
            </button>
          </div>

          {/* Products List */}
          <div className="flex-1 space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between bg-[#2a2a2a] p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-14 h-14 rounded-md"
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
                    <p className="text-green-500 font-medium">{product.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Category</p>
                    <p>{product.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Retail Price</p>
                    <p className="font-medium">${product.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex gap-3 text-sm">
                  <button className="fa-solid fa-pen text-[#ffffff] cursor-pointer"></button>
                  <button className="fa-solid fa-trash text-red-500 cursor-pointer"></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
