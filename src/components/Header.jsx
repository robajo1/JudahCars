import { Outlet, Link, useLocation } from "react-router-dom";
import "./header.css"; 
import { useEffect } from "react";
import { ul } from "framer-motion/client";
import SellerDashboard from "../pages/SellerDashBoard";

function Header() {
  const location = useLocation();
  const navClass = location.pathname === "/detail"  || location.pathname === "/aboutus" || location.pathname === "/cart" || location.pathname === "/login";
  const user = localStorage.getItem("user");
  useEffect(() => {}, [user]);


  if(JSON.parse(user) && JSON.parse(user).role === "SELLER"){
    return (
      <>
      <div style={{backgroundColor:"#f3f4f6", textAlign: "end"}}>
        {JSON.parse(user) ? (
              <button className="cart " onClick={() => { localStorage.removeItem("user"); window.location.href = "/"; }}>LogOut</button>
          ) : (
            <></>)}
      </div>
      <SellerDashboard/>
      </>
    );    
  }else{
  return (
    <>
      <nav className={`header-nav ${navClass? 'details-page' : ''}`}>
        <ul>
          <li>
            <Link to="/" className="title">JUDAH Shop</Link>
          </li>
          <li className="nav-links-container">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/aboutus" className="title">About Us</Link>
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
                  <button className="cart" onClick={() => { localStorage.removeItem("user"); window.location.href = "/"; }}>Logout</button>
                ) : (
                  <></>
                )}
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );}
}

export default Header;