import { Outlet, Link } from "react-router-dom";
function Header() {
    return(
        <>
            <nav className=" absolute top-0 left-0 w-full bg-black/0 p-4 text-black  z-10">
                <ul className="flex justify-between items-center">
                    <li>
                        <Link to="/">JUDAH Shop</Link>
                    </li>
                    <div className="flex space-x-4 mx-10 ">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/detail">Details</Link>
                        </li>
                        <li>
                            <Link to="/aboutus">About Us</Link>
                        </li>
                    </div>
                </ul>
            </nav>

      <Outlet />
    </>
    )
}
export default Header;