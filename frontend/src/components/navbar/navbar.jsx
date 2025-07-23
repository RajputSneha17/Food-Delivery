import React, { Profiler, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./navbar.css";
import { assets } from "../../assets/assets";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNav = (section) => {
    setMenu(section);
    setShowSidebar(false);
    setShowProfileDropdown(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: section } });
    } else {
      scrollToSection(section);
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        scrollToSection(location.state.scrollTo);
      }, 300);
    }
  }, [location]);

  const NavItem = ({ section, text }) => (
    <div
      className={`btn btn-link text-decoration-none ${
        menu === section ? "text-danger fw-bold" : "text-dark"
      }`}
      onClick={() => handleNav(section)}
      style={{ cursor: "pointer" }}
    >
      {text}
    </div>
  );

  const SidebarItem = ({ section, text }) => (
    <div
      className={`btn btn-link text-start ${
        menu === section ? "text-danger fw-bold" : "text-dark"
      }`}
      onClick={() => handleNav(section)}
      style={{ cursor: "pointer", textDecoration: "none" }}
    >
      {text}
    </div>
  );

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <>
      <nav className="navbar navbar-expand-md bg-white fixed-top shadow-sm p-2 p-md-3">
        <div className="container-fluid">
          <div
            className="navbar-brand"
            onClick={() => handleNav("home")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={assets.logo}
              alt="logo"
              className="img-fluid"
              style={{ width: "120px", height: "auto" }}
            />
          </div>

          <button
            className="navbar-toggler border-0 p-0"
            onClick={() => setShowSidebar(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {[
                ["home", "Home"],
                ["explore-menu", "Menu"],
                ["app-download", "Mobile-App"],
                ["footer", "Contact us"],
              ].map(([section, text]) => (
                <li key={section} className="nav-item mx-2">
                  <NavItem section={section} text={text} />
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center gap-3">
              <div className="position-relative">
                <Link to="/cart" className="btn  p-2" style={{borderColor: "tomato"}}>
                  <img src={assets.basket_icon} alt="cart" width="20" />
                  {getTotalCartAmount() > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" />
                  )}
                </Link>
              </div>

              {!token ? (
                <button
                  className="btn btn-danger px-3 py-2"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
              ) : (
                <div className="position-relative profile-dropdown">
                  <img
                    src={assets.profile_icon}
                    alt="profile"
                    className="rounded-circle"
                    style={{ width: "35px", height: "35px", cursor: "pointer" }}
                  />
                  <div className="profile-dropdown-menu bg-white shadow-sm rounded mt-2">
                    <button className="dropdown-item text-secondary d-flex align-items-center gap-2">
                      <i className="fas fa-box text-pink"></i> Orders
                    </button>
                    <button onClick={logout} className="dropdown-item text-secondary d-flex align-items-center gap-2">
                      <i className="fas fa-sign-out-alt text-pink"></i> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar for small screen */}
      <div
        className={`offcanvas offcanvas-end ${showSidebar ? "show" : ""}`}
        style={{ visibility: showSidebar ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header justify-content-end">
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setShowSidebar(false);
              setShowProfileDropdown(false);
            }}
          />
        </div>
        <div className="offcanvas-body d-flex flex-column gap-3 px-4">
          {[
            ["home", "Home"],
            ["explore-menu", "Menu"],
            ["app-download", "Mobile-App"],
            ["footer", "Contact us"],
          ].map(([section, text]) => (
            <SidebarItem key={section} section={section} text={text} />
          ))}
          <div className="d-flex gap-3 mt-4">
            <Link
              to="/cart"
              className="  btn d-flex align-items-center justify-content-center p-2"
              style={{ width: "40px", height: "40px", borderColor: "tomato" }}
            >
              <img src={assets.basket_icon} alt="cart" width="20" />
              {getTotalCartAmount() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle p-1  border border-light rounded-circle" />
              )}
            </Link>

            {!token ? (
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowLogin(true);
                  setShowSidebar(false);
                }}
              >
                Login
              </button>
            ) : (
              <div className="position-relative profile-dropdown-sidebar ">
                <img
                  src={assets.profile_icon}
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: "35px", height: "35px", cursor: "pointer" }}
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                />

                {showProfileDropdown && (
                  <div className="profile-dropdown-menu bg-white shadow-sm rounded mt-2">
                    <button className="dropdown-item text-secondary d-flex align-items-center gap-2">
                      <i className="fas fa-box text-pink"></i> Orders
                    </button>
                    <button onClick={logout} className="dropdown-item text-secondary d-flex align-items-center gap-2">
                      <i className="fas fa-sign-out-alt text-pink"></i> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showSidebar && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <style>{`body { padding-top: 56px } @media (min-width: 768px) { body { padding-top: 72px } }`}</style>
    </>
  );
};

export default Navbar;
