import React from 'react'
import useAuthStore from '../store/authStore';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const logout = useAuthStore((s) => s.logout);
    const user = useAuthStore((s) => s.user);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={user ? '/dashboard' : '/login'}>
                    Apka Clinic
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {user && (
                        <>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                                {/* Active highlight automatically */}
                                <li className="nav-item">
                                    <NavLink
                                        to="/dashboard"
                                        className={({ isActive }) =>
                                            "nav-link" + (isActive ? " active fw-bold" : "")
                                        }
                                    >
                                        Appointments
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        to="/make-appointment"
                                        className={({ isActive }) =>
                                            "nav-link" + (isActive ? " active fw-bold" : "")
                                        }
                                    >
                                        Make Appointment
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <button className="btn btn-primary ms-2" onClick={logout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>

                            <form className="d-flex ms-3">
                                <input className="form-control me-2" type="search" placeholder="Search" />
                                <button className="btn btn-outline-success" type="submit">
                                    Search
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
