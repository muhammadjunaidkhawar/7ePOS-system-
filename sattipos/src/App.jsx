import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Staff from "./pages/Staff";
import Order from "./pages/Order";
import Reservation from "./pages/Reservation";
import Reports from "./pages/Reports";
import AddNewCategory from "./pages/AddNewCategory";
import AddMenuItem from "./pages/AddMenuItem";
import Profile from "./pages/Profile";
import Menu from "./pages/Menu";
import Notification from "./pages/Notification";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/order" element={<Order />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/addnewcategory" element={<AddNewCategory />} />
      <Route path="/addmenuitem" element={<AddMenuItem />} />
      <Route path="/notification" element={<Notification />} />
    </Routes>
  );
}

export default App;
