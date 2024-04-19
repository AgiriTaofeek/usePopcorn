import { useEffect, useState } from "react";
export const KEY = "fb9fc700";

const useMovies = (query, cb) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    cb?.(); // Optional chaining of only making a function call if the function exists
    //controller object is amazing for preventing GET requests at every keystrokes since the query state is updated at every key stroke making a new request every time
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError(""); // Ensure to reset the error state before we start fetching data
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        if (data.Response === "False") throw new Error("No movies found");
        setMovies(data.Search);
        setError(""); // Do this because of the abortController which throws error for aborting a request
      } catch (err) {
        // console.error(err.message);
        // Javascript sees aborting a request as an error which will be caught in this catch block but we don't want this error to be set to error state. hence, we would ignore all errors that originates from the abortController object
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        //This code block always run even if the code terminates with throwing error in the try block
        setIsLoading(false);
      }
    }

    // Don't fetch data by calling the fetchMovies() below if the query string is less than 3 characters
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    // handleCloseMovie(); //Before you fetch a new movie always close the previously fetched movie
    fetchMovies();

    return () => {
      // At every keystroke, this App component is re-rendered because the query state is updated which in turn will make this useEffect hook to be re-executed also but recall that before every useEffect hook is re-executed, the cleanUp function is always executed first which literally aborts every fetch request at every keystrokes until the query state stops updating
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return { isLoading, error, movies };
};

export default useMovies;
