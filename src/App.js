import { useState } from "react";
import "./App.css";
import MoviesList from "./components/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);

  async function fetchMoviesHandler() {
    const response = await fetch("https://swapi.py4e.com/api/films/");
    const data = await response.json();

    const transformedData = data.results.map((x) => {
      return {
        id: x.episode_id,
        title: x.title,
        openingText: x.opening_crawl,
        releaseDate: x.release_date,
      };
    });
    setMovies(transformedData);
  }

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
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
