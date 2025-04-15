import { Outlet, Link, useLocation } from "react-router-dom";
import "./header.css"; 
import { useEffect } from "react";

function Header() {
  const location = useLocation();
  const navClass = location.pathname === "/detail";
  const user = localStorage.getItem("user");
  useEffect(() => {}, [user]);

  return (
    <>
      <nav className={`header-nav ${navClass? 'details-page' : ''}`}>
        <ul>
          <li>
            <Link to="/">JUDAH Shop</Link>
          </li>
          <div className="nav-links-container">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              {JSON.parse(user) ? (
                <Link to="/cart">
                  <button className="cart">Cart</button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="cart">Login</button>
                </Link>
              )}
            </li>
          </div>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default Header;