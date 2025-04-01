import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="navbar sticky-top bg-body-tertiary" data-bs-theme="dark">
      <div className="container-sm">
        <NavLink to="/new" className="navbar-brand">
          Create Task
        </NavLink>
        <NavLink to="/" className="navbar-brand">
          Tasks List
        </NavLink>
      </div>
    </nav>
  );
};
