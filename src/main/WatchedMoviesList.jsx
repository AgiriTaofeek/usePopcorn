import PropTypes from "prop-types";
import WatchedMovie from "./WatchedMovie";

const WatchedMoviesList = ({ watched, onDeleteMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
};

WatchedMoviesList.propTypes = {
  watched: PropTypes.array.isRequired,
  onDeleteMovie: PropTypes.func.isRequired,
};

export default WatchedMoviesList;
