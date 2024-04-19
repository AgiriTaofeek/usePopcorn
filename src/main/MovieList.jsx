import PropTypes from "prop-types";
import Movie from "./Movie";

const MovieList = ({ movies, onSelect }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelect={onSelect} />
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default MovieList;
