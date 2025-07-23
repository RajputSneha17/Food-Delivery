import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import './Sidebar.css'; // We'll add minimal CSS for precise control

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <NavLink
        to="/add"
        className={({ isActive }) =>
          `sidebar-link ${isActive ? 'active-sidebar-link' : ''}`
        }
      >
        <img src={assets.add_icon} alt="Add" />
        <span className="sidebar-text">Add Items</span>
      </NavLink>

      <NavLink
        to="/list"
        className={({ isActive }) =>
          `sidebar-link ${isActive ? 'active-sidebar-link' : ''}`
        }
      >
        <img src={assets.order_icon} alt="List" />
        <span className="sidebar-text">List Items</span>
      </NavLink>

      <NavLink
        to="/order"
        className={({ isActive }) =>
          `sidebar-link ${isActive ? 'active-sidebar-link' : ''}`
        }
      >
        <img src={assets.order_icon} alt="Orders" />
        <span className="sidebar-text">Orders</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;