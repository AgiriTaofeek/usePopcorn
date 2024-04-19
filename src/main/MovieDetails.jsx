import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import StarRating from "../reusable/StarRating";
import Loader from "../reusable/Loader";
import useKey from "../hooks/useKey";
const KEY = "fb9fc700";

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  // Derived state to prevent selecting the same movie over and over
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const countRef = useRef(0);

  useEffect(() => {
    // Keep track of the number of times, we setState of userRating and we added the if condition because onMount the count would have happened already which doesn't make sense. Instead we should only start counting when the userRating state has been set
    if (userRating) countRef.current += 1;
  }, [userRating]);

  useKey("Escape", onCloseMovie);

  // useEffect(() => {
  //   //  We would have to use the useRef hook to select this component element from the DOM but this approach also works because we would only be listening for a keydown event on the document when this component is currently in the DOM and it would execute the onCloseMovie() function. Whenever we use this approach, we have to remember to remove the listener from the document element when this component unmounts because if we don't, multiple eventListener would be added to the document element

  //   const listener = (e) => {
  //     if (e.code === "Escape") {
  //       onCloseMovie();
  //     }
  //   };

  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, [onCloseMovie]);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    //Recall that the useEffect is executed after the DOM has been painted. hence, initially title will be undefined when the useEffect is executed on mount but we should return early and wait for the other useEffect to fetch the title data which would trigger a re-render and this time, title property will be accessible and we can then go ahead to set the document.title
    if (!title) return;
    // It makes sense to add the useEffect in this component because we want the title to change to the selected movie from the movie list
    document.title = `Movie | ${title}`;

    //Reset the document title to the initial state just immediately the component unmounts
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  const handleAddMovie = () => {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newMovie);
    onCloseMovie();
  };

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Image of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={20}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddMovie}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

MovieDetails.propTypes = {
  selectedId: PropTypes.any.isRequired,
  onCloseMovie: PropTypes.func.isRequired,
  onAddWatched: PropTypes.func.isRequired,
  watched: PropTypes.array.isRequired,
};
export default MovieDetails;
