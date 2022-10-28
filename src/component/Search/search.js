import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Carousel, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as Rating } from "@fortawesome/free-solid-svg-icons"
import { background1 } from '../../asset/index_image'
import { getSearch, searchCategory } from "../../reducer/searchSlice";
import { getGenres } from "../../reducer/genreSlice";
import { NoImgAvalible } from "../../asset/index_image";
import Swipers from "../Swipers/swipers";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import './search.css'
import { useDispatch, useSelector } from "react-redux";


const Search = () => {
    const { que, category } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();

    const genres = useSelector((state) => state.genres);
    const search = useSelector((state) => state.search.searchs);
    const searchCate = useSelector((state) => state.searchCate.categorys);

    // const [movie, setMovie] = useState([])
    // const [cate, setCate] = useState([])

    // const loadData = async (que) => {
    //     const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a2940e397cdc84f3a8a5619d3d65b9c5&query=${que}`)
    //     setMovie(res.data.results)
    // }

    // const searchCate = async (category) => {
    //     const getMovie = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a2940e397cdc84f3a8a5619d3d65b9c5&query=${category}`)
    //     const getList = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=a2940e397cdc84f3a8a5619d3d65b9c5&query=${category}`) //genresSlice
    //     setCate(getList.data.genres)
    //     setMovie(getMovie.data.results)
    // }

    useEffect(() => {
        if(que) {
            dispatch(getSearch(que));
        } else {
            dispatch(searchCategory(category));
            dispatch(getGenres);
        }
    }, [que, category, dispatch])

    return (
        <div>
            {/* <NavBar/> */}
            <Carousel indicators={false} controls={false}>
                <Carousel.Item>
                    <div className="images" style={{height: '60vh'}}>
                        <img className="d-block w-100 absolute" src={background1}/>
                    </div>
                    <Carousel.Caption>
                        <Container>
                            <div className="header text-start">
                                {category ? (
                                    <h1 className="header_text">Genre:{location.state}</h1>
                                ): (
                                    <h1 className="header-text">All Movies "{que}"</h1>
                                )}
                            </div>
                        </Container>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <section className="movieSection">
                {category ? (
                    <>
                    <h1 className="tittle-section">Browse by category {location.state}</h1>
                    <Swipers cate={genres.genres}/>
                    </>
                ):(
                    <h1 className="tittle-section">Search result "{que}"</h1>
                )}

                {search.length> 0 ? (
                    <div className="movieWrapper">
                        {search.map((movies, index) => {
                            return (
                                <div className="movie-card" key={index} onClick={() => navigate(`/movie/${movies.id}`)}>
                                    {movies.poster_path !== null ? (
                                        <img className="image-card" src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}/>
                                    ) : (
                                        <img className="image-card" src={NoImgAvalible}/>
                                    )};
                                    <div className="movie-info">
                                        <h5>{movies.original_title}</h5>
                                        <p><FontAwesomeIcon color="orange" icon={Rating}/>{movies.vote_average}/10</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <h1>There not found</h1>
                    </div>
                )}

                    {searchCate.length> 0 ? (
                        <div className="movieWrapper">
                            {searchCate.map((movies, index) => {
                                return (
                                    <div className="movie-card" key={index} onClick={() => navigate(`/movie/${movies.id}`)}>
                                        {movies.poster_path !== null ? (
                                        <img className="image-card" src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}/>
                                        ) : (
                                        <img className="image-card" src={NoImgAvalible}/>
                                        )};
                                        <div className="movie-info">
                                            <h5>{movies.original_title}</h5>
                                            <p><FontAwesomeIcon color="orange" icon={Rating}/>{movies.vote_average}/10</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                    <div>
                        <h1>There not found</h1>
                    </div>
                    )};
            </section>
        </div>
    )
}

export default Search