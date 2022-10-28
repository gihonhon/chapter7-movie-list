import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from "react-bootstrap";
import { faStar as Rating } from '@fortawesome/free-solid-svg-icons'
import { faClipboard as ClipBoard } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NoImgAvalible } from "../../asset/index_image";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import "swiper/css";
import "swiper/css/pagination";
import './swipers.css';


const Swipers = (props) => {
    const navigate = useNavigate()

    const { movie, cate, review, actor } = props

    if(movie) {
        return (
            <>
            <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
                clickable: true
            }}
            className="mySwiper"
            >
                {movie && movie.map((result) => {
                    return (
                        <SwiperSlide key={result.id} onClick={() => navigate(`/movie/${result.id}`)}>
                            <div className="movie-card">
                                <img className="image-card" src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}/>
                                <div className="movie-info">
                                    <h5>{result.original_title}</h5>
                                    <span><FontAwesomeIcon style={{color:'gold'}} icon={Rating}/>{result.vote_average} / 10</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            </>
        )
    }

    if(cate) {
        return (
            <>
            <Swiper
            slidesPerView={6}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            className="mySwiper">
                {cate && cate.map((result) => {
                    return (
                        <SwiperSlide className="cursor-pointer h-auto mb-10 me-4" key={result.id} onClick={() => navigate(`/cat/${result.name}`,{ state: result.name })}>
                            <Button variant="outline-danger">{result.name}</Button>
                        </SwiperSlide>

                    )
                })}
            </Swiper>
            </>
        )
    }

    if(actor) {
        return (
            <>
            <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
                clickable: true
            }}
            className="mySwiper">
                {actor && actor.map((result) => {
                    return (
                        <SwiperSlide key={result.id}>
                            {result.profile_path !== null ? (
                                <div className="movie-card">
                                    <img className="image-card" src={`https://image.tmdb.org/t/p/w500/${result.profile_path}`}/>
                                    <div className="movie-info">
                                        <h2>{result.name}</h2>
                                        <p>{result.character}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="movie-card">
                                    <img className="image-card" src={NoImgAvalible}/>
                                    <div className="movie-info">
                                        <h2>{result.name}</h2>
                                            <p>{result.character}</p>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            </>
        )
    }

    if(review) {
        return (
            <>
            <Swiper
            slidesPerView={2}
            spaceBetween={20}
            pagination={{
                clickable: true
            }}
            className="mySwiper">
                {review.length > 0 ? (
                    review.map((result) => {
                        return (
                            <SwiperSlide key={result.id}>
                                <div className="commentCard">
                                    <div style={{display: 'flex', marginBottom: '1.5rem', alignItems: 'center'}}>
                                        <span className="usersAvatar">
                                            <img src={`https://ui-avatars.com/api/?name=${result.author}`}/>
                                        </span>
                                        <span style={{marginLeft: '1rem', fontSize: '1.5rem'}}>{result.author}</span>
                                    </div>
                                    <p>
                                        {result.author_details.rating === null ? (
                                            "empty"
                                        ) : (
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <FontAwesomeIcon color="orange" icon={Rating}/> {result.author_details.rating} / 10
                                            </div>
                                        )}
                                    </p>
                                    <h5>{result.content}</h5>
                                    <p></p>
                                </div>
                            </SwiperSlide>
                        );
                    })
                ) : (
                    <div className="not-data">
                        <FontAwesomeIcon fontSize="4rem" color="rgba(156, 163, 175, 1)"  icon={ClipBoard}/>
                        <h1>There is no data</h1>
                    </div>
                )}
            </Swiper>
            </>
        )
    }

    
}

export default Swipers