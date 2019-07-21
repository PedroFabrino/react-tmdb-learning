import React from "react";
import MovieCard from "./MovieCard.jsx";
import styled from "styled-components";

const MovieListComponent = styled.div`
	display: grid;
	justify-items: stretch;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	grid-template-rows: repeat(auto-fit, minmax(400px, 1fr));
	grid-gap: 20px;
	padding-top: 15px;
`;
export default function MovieList(data, handleClick) {
	return (
		<MovieListComponent className="movie-list">
			{data.movies &&
				data.movies.map(movie => (
					<MovieCard
						{...movie}
						key={movie.id}
						onClick={handleClick}
					/>
				))}
		</MovieListComponent>
	);
}
