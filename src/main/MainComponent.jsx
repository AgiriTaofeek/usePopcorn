import PropTypes from "prop-types";

const MainComponent = ({ children }) => {
  return <main className="main">{children}</main>;
};

MainComponent.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MainComponent;
