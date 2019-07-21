import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./Movies/MovieList.jsx";
import TextField from "@material-ui/core/TextField";

const apiPath = "https://api.themoviedb.org/3";
const apiKey = "";

function App() {
	useEffect(() => {
		axios
			.get(`${apiPath}/discover/movie?api_key=${apiKey}`)
			.then(response => {
				setMovies(response.data.results);
			})
			.catch(error => {
				setMovies(error);
			});
	});

	const handleClick = id => {
		axios
			.get(`${apiPath}/movie/${id}?api_key=${apiKey}`)
			.then(movie => {
				console.log(JSON.stringify(movie, null, 2));
			})
			.catch(error => {
				console.log(error);
			});
	};
	const [movies, setMovies] = useState();
	const [filter, setFilter] = useState("");

	return (
		<>
			<TextField
				value={filter}
				placeholder="Movie name"
				onChange={event => setFilter(event.target.value)}
			/>
			<MovieList
				movies={
					movies &&
					movies.filter(m =>
						m.title
							.toLowerCase()
							.includes(filter && filter.toLowerCase())
					)
				}
				handleClick={() => handleClick}
			/>
		</>
	);
}

export default App;
