import PropTypes from "prop-types";

const NavBar = ({ children }) => {
  return <nav className="nav-bar">{children}</nav>;
};

NavBar.propTypes = {
  children: PropTypes.node,
};

export default NavBar;
