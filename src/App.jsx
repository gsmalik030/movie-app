import { useState, useEffect } from 'react';
import getData from './utils/api.js';
import { useSelector, useDispatch } from 'react-redux';
import { setUrl } from './store/homeSlice.js';
import PageNotFount from './pages/404/PageNotFound';
import Explore from './pages/explore/Explore.jsx';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import Home from './pages/home/Home.jsx';
import Details from './pages/details/Details.jsx';
import SearchResult from './pages/searchResult/SearchResult';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    apiTest();
  }, []);

  const apiTest = async () => {
    const data = await getData('/configuration');
    const imgUrl = {
      backdrop: data.images.secure_base_url + 'original',
      poster: data.images.secure_base_url + 'w500',
    }
    dispatch(setUrl(imgUrl));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore:mediaType' element={<Explore />} />
        <Route path='/details/:mediaType/:id' element={<Details />} />
        <Route path='/search/:search' element={<SearchResult />} />
        <Route path='*' element={<PageNotFount />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
