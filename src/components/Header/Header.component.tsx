import {Link} from "react-router-dom";
import {checkIfLoggedIn} from "../../services/checkIfLoggedIn";
import {logout} from "../../services/logout.ts";

export default function Header() {
    const isLoggedIn = checkIfLoggedIn();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
            <div className="container-fluid">
                <span className="navbar-brand">Project X</span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse gap-2" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">
                                Home
                            </Link>
                        </li>
                    </ul>

                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="nav-link text-light">
                                Login
                            </Link>
                            <Link to="/register" className="nav-link text-light">
                                Register
                            </Link>
                        </>
                    ) : (
                        <Link to="/logout" className="nav-link text-light" onClick={logout}>
                            logout
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}