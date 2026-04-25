import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    return (
        <header className="navbar">
            <div className="navbar-brand">
                <span className="navbar-logo">✨</span>
                Users Manager
            </div>
            <nav className="navbar-links">
                <Link className={location.pathname === "/" ? "active" : ""} to="/">
                    Home
                </Link>
                <Link className={location.pathname === "/add" ? "active" : ""} to="/add">
                    Add User
                </Link>
            </nav>
        </header>
    );
}

export default Navbar;