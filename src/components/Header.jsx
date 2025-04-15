import { Outlet, Link, useLocation } from "react-router-dom";
import "./header.css"; 
import { useEffect } from "react";
import { ul } from "framer-motion/client";
import SellerDashboard from "../pages/SellerDashBoard";

function Header() {
  const location = useLocation();
  const navClass = location.pathname === "/detail";
  const user = localStorage.getItem("user");
  useEffect(() => {}, [user]);


  if(JSON.parse(user) && JSON.parse(user).isSeller){
    return (
      <>
      <ul>
        <li>
        {JSON.parse(user) ? (
              <button className="cart" onClick={() => { localStorage.removeItem("user"); window.location.href = "/"; }}>LogOut</button>
          ) : (
            <></>)}
        </li>
      </ul>
      <SellerDashboard/>
      </>
    );    
  }else{
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
            <li>
            {JSON.parse(user) ? (
                  <button className="cart" onClick={() => { localStorage.removeItem("user"); window.location.href = "/"; }}>LogOut</button>
              ) : (
                <></>)}
            </li>
          </div>
        </ul>
      </nav>

      <Outlet />
    </>
  );}
}

export default Header;