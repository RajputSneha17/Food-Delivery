import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="container" style={{ height: "80px" }}>
      <div className="row align-items-center">
        <NavLink to="/" className="col" style={{ cursor: "pointer" }}>
          <img src={assets.logo} alt="" />
        </NavLink>
        <div className="col text-end">
          <img src={assets.profile_image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
