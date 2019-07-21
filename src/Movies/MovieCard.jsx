import React from "react";
import styled from "styled-components";
import moment from "moment";
import StarRatingComponent from "react-star-rating-component";
import ReactTooltip from "react-tooltip";

const MovieCard = styled.div.attrs(props => ({
	imagePath: `https://image.tmdb.org/t/p/w1280/${props.backdrop}`
}))`
	padding: 15px;
	border-radius: 5px;
	box-shadow: 4px 6px 13px 0px rgba(0, 0, 0, 0.5);
	background-image: url(${props => props.imagePath});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	position: relative;
	overflow: hidden;
	height: 300px;
	:hover {
		cursor: pointer;
	}
	.content {
		color: white;
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		height: 100%;

		.title {
			&_name {
				font-size: 1.5em;
				margin-right: 1em;
				max-width: 70%;
			}
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-grow: 0;
			flex-shrink: 0;
			padding-bottom: 0.5em;
			&_rating {
				align-items: flex-start;
			}
		}

		.description {
			flex-grow: 1;
			display: flex;
			align-items: flex-end;
		}

		.release-date {
			align-self: flex-end;
		}
	}
	:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		pointer-events: none;
		background-color: rgba(0, 0, 0, 0.7);
	}
`;
export default function Movie({
	vote_count,
	id,
	video,
	vote_average,
	title,
	popularity,
	poster_path,
	original_language,
	original_title,
	genre_ids,
	backdrop_path,
	adult,
	overview,
	release_date,
	handleClick
}) {
	return (
		<MovieCard
			className="movie-card"
			backdrop={backdrop_path ? backdrop_path : poster_path}
			onClick={() => handleClick(id)}
		>
			<div className="content">
				<div className="title">
					<span className="title_name">{title}</span>
					<div className="title_rating" data-tip={`${vote_average}`}>
						<StarRatingComponent
							name="rate"
							starCount={5}
							value={Math.round(vote_average / 2)}
						/>
					</div>
					<ReactTooltip />
				</div>
				<div className="description">{overview}</div>
				<div className="release-date">
					{moment(release_date).format("DD/MM/YYYY")}
				</div>
			</div>
		</MovieCard>
	);
}
