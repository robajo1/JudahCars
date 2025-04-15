import { Outlet, Link } from "react-router-dom";
import "./header.css"; 

function Header() {
    return(
        <>   
        <nav className="header-nav">
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
                            <Link to="/"><button className="cart">Cart</button></Link>
                        </li>
                    </div>
                </ul>
            </nav>

      <Outlet />
    </>
    )
}

export default Header;