import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./Movies/MovieList.jsx";
import TextField from "@material-ui/core/TextField";
import BottomScrollListener from 'react-bottom-scroll-listener';
 
const apiPath = "https://api.themoviedb.org/3";
const apiKey = "27b18f1605a11fccfe1b2c9085bc3006";

function App() {
	useEffect(() => {
		request(page);
	}, []);

	const handleClick = ((id) => {
		console.log(`/movie/${id}?api_key=${apiKey}`)
		axios
			.get(`${apiPath}/movie/${id}?api_key=${apiKey}`)
			.then(movie => {
				console.log(JSON.stringify(movie, null, 2));
			})
			.catch(error => {
				console.log(error);
			});
	});
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState();
	const [filter, setFilter] = useState("");
	const [page, setPage] = useState(1);

	const request = (page) => {
		setPage(page + 1)
		console.log(`/movie?api_key=${apiKey}&page=${page}`)
		axios
			.get(`${apiPath}/discover/movie?api_key=${apiKey}&page=${page}`)
			.then(response => {
				console.log(response);
				setError(undefined);
				setMovies((movies) => movies.concat(response.data.results));
			})
			.catch(error => {
				console.log(error);
				setError(error);
			});
	}
	return (
		<>
			{error && 
				JSON.stringify(error.message, null, 2)}
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
				handleClick={handleClick}
			/>
			<BottomScrollListener onBottom={() => request(page)} offset="300" />
		</>
	);
}

export default App;
