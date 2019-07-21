import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./Movies/MovieList.jsx";
import TextField from "@material-ui/core/TextField";
import BottomScrollListener from 'react-bottom-scroll-listener';
 
const apiPath = "https://api.themoviedb.org/3";
const apiKey = "";

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
	const [filter, setFilter] = useState("");
	const [page, setPage] = useState(1);

	const request = (page) => {
		setPage(page + 1);
		axios
			.get(`${apiPath}/discover/movie?api_key=${apiKey}&page=${page}`)
			.then(response => {
				setMovies((movies) => movies.concat(response.data.results));
			})
			.catch(error => {
				console.error(error);
			});
	}
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
				handleClick={handleClick}
			/>
			<BottomScrollListener onBottom={() => request(page)} offset="800" />
		</>
	);
}

export default App;
