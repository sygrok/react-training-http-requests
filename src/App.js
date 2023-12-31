import { useEffect, useState, useCallback } from "react";
import "./App.css";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //http request
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-587ad-default-rtdb.europe-west1.firebasedatabase.app/movies.json/"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedData = [];

      for (const key in data) {
        loadedData.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].release_date,
        });
      }

      setMovies(loadedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  //to start initially
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  //Add movie function
  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-http-587ad-default-rtdb.europe-west1.firebasedatabase.app/movies.json/",
      {
        method: "POST", //default is 'GET'
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      }
    );
    const movie = await response.json;
    fetchMoviesHandler();
  }

  //conditional content
  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;

//without async / await
// const fetchMoviesHandler = () => {
//   fetch("https://swapi.py4e.com/api/films/")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       const transformedData = data.results.map((x) => {
//         return {
//           id: x.episode_id,
//           title: x.title,
//           openingText: x.opening_crawl,
//           releaseDate: x.release_date,
//         };
//       });
//       setMovies(transformedData);
//     });
// };
