import { useState } from "react";
import NavBar from "./nav/NavBar";
import MainComponent from "./main/MainComponent";
import NumResults from "./nav/NumResults";
import Logo from "./nav/Logo";
import Search from "./nav/Search";
import Box from "./main/Box";
import MovieList from "./main/MovieList";
import WatchedSummary from "./main/WatchedSummary";
import WatchedMoviesList from "./main/WatchedMoviesList";
import Loader from "./reusable/Loader";
import ErrorMessage from "./reusable/ErrorMessage";
import MovieDetails from "./main/MovieDetails";
import useMovies from "./hooks/useMovies";
import useLocaleStorageState from "./hooks/useLocaleStorageState";
// import { tempMovieData, tempWatchedData } from "./constants/data";
// export const KEY = "fb9fc700";

export default function App() {
  // const [movies, setMovies] = useState([]);
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [watched, setWatched] = useState(() =>
  //   JSON.parse(localStorage.getItem("watched"))
  // ); // The returned value of the function passed to the watched state will only be used on the initial render. Recall that function are basically just values because they return values even a function without the return keyword returns undefined
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocaleStorageState([], "watched");
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie); // The custom hook useEffect wants me to add the callback function as a dependency but adding it would cause an infinite re-rendering because every time this App function is re-rendered the handleCloseMovie is a new function which will cause this App component to be re-rendered over and over again
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectedId(id) {
    // Check if the current state is the same as the newly selected id, if it is set to null to remove it from the DOM which introduces the functionality of clicking on the same Component twice will take it off the DOM.
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    // Setting it to null would make selectedId state be falsy. hence, the WatchedSummary component would be rendered as the UI
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);

    //Adding the watched state data to the browser localStorage could be be done here but we would do it in the useEffect because we would have to repeat for deleting a data from the localStorage. Always remember to use event handlers as default for side effects and only use useEffect when necessary
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatchedMovie(movieId) {
    setWatched((watched) =>
      watched.filter((movie) => movie.imdbID !== movieId)
    );
  }

  // Ideally the fetch function inside this useEffect hook is actually more event handler because we are actually not fetching any data onMount but only when we perform action i.e type in a query string into a search component
  // useEffect(() => {
  //   //controller object is amazing for preventing GET requests at every keystrokes since the query state is updated at every key stroke making a new request every time
  //   const controller = new AbortController();
  //   async function fetchMovies() {
  //     try {
  //       setIsLoading(true);
  //       setError(""); // Ensure to reset the error state before we start fetching data
  //       const res = await fetch(
  //         `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
  //         { signal: controller.signal }
  //       );
  //       if (!res.ok) throw new Error("Something went wrong");
  //       const data = await res.json();
  //       if (data.Response === "False") throw new Error("No movies found");
  //       setMovies(data.Search);
  //       setError(""); // Do this because of the abortController which throws error for aborting a request
  //     } catch (err) {
  //       console.error(err.message);
  //       // Javascript sees aborting a request as an error which will be caught in this catch block but we don't want this error to be set to error state. hence, we would ignore all errors that originates from the abortController object
  //       if (err.name !== "AbortError") setError(err.message);
  //     } finally {
  //       //This code block always run even if the code terminates with throwing error in the try block
  //       setIsLoading(false);
  //     }
  //   }

  //   // Don't fetch data by calling the fetchMovies() below if the query string is less than 3 characters
  //   if (query.length < 3) {
  //     setMovies([]);
  //     setError("");
  //     return;
  //   }

  //   handleCloseMovie(); //Before you fetch a new movie always close the previously fetched movie
  //   fetchMovies();

  //   return () => {
  //     // At every keystroke, this App component is re-rendered because the query state is updated which in turn will make this useEffect hook to be re-executed also but recall that before every useEffect hook is re-executed, the cleanUp function is always executed first which literally aborts every fetch request at every keystrokes until the query state stops updating
  //     controller.abort();
  //   };
  // }, [query]);

  // useEffect(() => {
  //   // It makes perfect sense to do this here because the localStorage will be automatically updated for adding,deleting and updating the watched data state instead of performing all these tasks in each of the event handler for those actions
  //   localStorage.setItem("watched", JSON.stringify(watched));
  // }, [watched]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <MainComponent>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelect={handleSelectedId} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </MainComponent>
    </>
  );
}
