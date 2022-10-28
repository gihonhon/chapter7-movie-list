import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'
import Footer from './component/Footer/footer';
import NavBar from './component/Navbar/navbar';
import Search from './component/Search/search';
import './index.css'
import { store } from './app/store';
import AllMovies from './page/allMovie/all';
import Detail from './page/Detail/detail';
import Home from './page/Home/home';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='67751698887-k04h2k8e4sirhvgj6chtevcb0cqok6q8.apps.googleusercontent.com'>
    <Provider store={store}>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/movies' element={<AllMovies/>}></Route>
      <Route path='/movie/:id' element={<Detail/>}></Route>
      <Route path='/search/:que' element={<Search/>}></Route>
      <Route path='/cat/:category' element={<Search/>}></Route>

    </Routes>
    <Footer/>
    </BrowserRouter>
    </Provider>
    </GoogleOAuthProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

