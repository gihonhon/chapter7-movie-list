import { configureStore } from "@reduxjs/toolkit";
import movieReduce from '../reducer/movieSlice';
import genreReduce from '../reducer/genreSlice';
import { loginRedux, registerRedux} from "../reducer/logRegSlice";
import { detailsRedux, actorRedux, reviewRedux, trailerRedux } from "../reducer/detailSlice";
import { searchRedux, searchCategoryRedux } from "../reducer/searchSlice";

export const store = configureStore({
    reducer: {
        movies: movieReduce,
        genres: genreReduce,
        detail: detailsRedux,
        actor: actorRedux,
        review: reviewRedux,
        trailer: trailerRedux,
        search: searchRedux,
        searchCate: searchCategoryRedux,
        login: loginRedux,
        register: registerRedux,
    }
});