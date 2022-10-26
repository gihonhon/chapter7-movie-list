import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import { background1 } from "../../asset/index_image";
import 'bootstrap/dist/css/bootstrap.min.css';
import './all.css'

const AllMovies = () => {
    const [getItems, setItems] = useState([])

    const [pageCount, setPageCount] = useState(0)
    let limit = 5

    return (
        <div>
            <Carousel indicators={false} controls={false}>
                <Carousel.Item>
                    <div className="images" style={{height: '60vh'}}>
                        <img className="d-block w-100 absolute" src={background1}/>
                    </div>
                    <Carousel.Caption>
                        
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )

}

export default AllMovies