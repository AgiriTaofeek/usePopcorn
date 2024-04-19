import { useRef } from "react";
import PropTypes from "prop-types";
import useKey from "../hooks/useKey";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    // If search component is actively focused i.e currently typing in it, don't do nothing else,
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery(""); //Clear the search value
  });

  // useEffect(() => {
  //   const listener = (e) => {
  //     if (e.code === "Enter") {
  //       // If search component is actively focused i.e currently typing in it, don't do nothing else,
  //       if (document.activeElement === inputEl.current) return;
  //       inputEl.current.focus();
  //       setQuery(""); //Clear the search value
  //     }
  //   };
  //   document.addEventListener("keydown", listener);

  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      ref={inputEl}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

Search.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default Search;
