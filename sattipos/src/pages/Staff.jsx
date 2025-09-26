import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Staff() {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    navigate("/"); // Redirect to login
  };

  const [staff] = useState([
    {
      id: "#101",
      name: "Rao Fareed",
      role: "Manager",
      email: "raoo112@gmail.com",
      phone: "+92 34235352",
      age: "23 yr",
      salary: "$2200.00",
      timings: "9am to 6pm",
    },
    {
      id: "#101",
      name: "Junaid Malik",
      role: "Manager",
      email: "junaid112@gmail.com",
      phone: "+92 42352352",
      age: "24 yr",
      salary: "$2200.00",
      timings: "9am to 6pm",
    },
    {
      id: "#101",
      name: "Sabbat Satti",
      role: "Manager",
      email: "sabbatsatti112@gmail.com",
      phone: "+1 (123) 123 4854",
      age: "45 yr",
      salary: "$2200.00",
      timings: "9am to 6pm",
    },
    {
      id: "#101",
      name: "Saad Satti",
      role: "Manager",
      email: "saadsatti@gmail.com",
      phone: "+1 (123) 123 4854",
      age: "45 yr",
      salary: "$2200.00",
      timings: "9am to 6pm",
    },
    {
      id: "#101",
      name: "Saleem Satti",
      role: "Manager",
      email: "saleemsatti@gmail.com",
      phone: "+1 (123) 123 4854",
      age: "60 yr",
      salary: "$220",
      timings: "12am to 12pm",
    },
    {
      id: "#101",
      name: "Sidra Satti",
      role: "Manager",
      email: "sid112@gmail.com",
      phone: "+1 (123) 123 4854",
      age: "45 yr",
      salary: "$2200.00",
      timings: "9am to 6pm",
    },
    {
      id: "#102",
      name: "Maryam Satti",
      role: "Cashier",
      email: "ms@gmail.com",
      phone: "+1 (321) 555 7890",
      age: "32 yr",
      salary: "$1500.00",
      timings: "10am to 7pm",
    },
    {
      id: "#102",
      name: "Sarah Smith",
      role: "Cashier",
      email: "sarahsmith@gmail.com",
      phone: "+1 (321) 555 7890",
      age: "32 yr",
      salary: "$1500.00",
      timings: "10am to 7pm",
    },
  ]);

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
              <i className="fa-solid fa-bell text-xl text-white"></i>
              {/* <span className="absolute -top-1 -right-1 bg-[#FF9500] text-black text-xs font-bold rounded-full px-1.5">
                01
              </span> */}
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
    <button className="bg-[#FF9500] hover:bg-[#e68806] text-sm hover:text-black text-white px-4 py-2 rounded-md">
      Staff Management
    </button>
    <button className="bg-[#FF9500] hover:bg-[#e68806] text-sm hover:text-black px-4 py-2 rounded-md">
      Attendance
    </button>
  </div>

  {/* Right side buttons*/}
  <div className="flex gap-3">
    <button className="bg-[#FF9500] hover:bg-[#e68806] text-sm hover:text-black text-white px-4 py-2 rounded-md">
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
              {staff.map((member, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3">{member.id}</td>
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${member.name}&background=random`}
                      alt={member.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="text-sm">{member.name}</div>
                      <span className="text-xs text-orange-400">
                        {member.role}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{member.email}</td>
                  <td className="p-3 text-sm">{member.phone}</td>
                  <td className="p-3 text-sm">{member.age}</td>
                  <td className="p-3 text-sm">{member.salary}</td>
                  <td className="p-3 text-sm">{member.timings}</td>
                  <td className="p-3 flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center bg-[#FF9500] text-black rounded-full">
                      <i className="fa-solid fa-eye text-xs"></i>
                    </button>
                    <button className="p-2 text-white rounded-md">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="p-2 text-red-500 rounded-md">
                      <i className="fa-solid fa-trash"></i>
                    </button>
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
