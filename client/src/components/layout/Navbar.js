import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
const Navbar = ({ auth, logout }) => {
  const { isAuthenticated } = auth;
  if (isAuthenticated) {
    return (
      <Fragment>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/profile">Developers</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <a onClick={logout} href={"#!"}>
              <i className="fas fa-sign-out-alt" />{" "}
              <span className="hide-sm">Logout</span>
            </a>
          </li>
        </ul>
      </Fragment>
    );
  }
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="!#">Developers</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
