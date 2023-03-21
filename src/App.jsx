import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUrl,setGenres } from './store/homeSlice.js';
import PageNotFount from './pages/404/PageNotFound';
import Explore from './pages/explore/Explore.jsx';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import Home from './pages/home/Home.jsx';
import Details from './pages/details/Details.jsx';
import SearchResult from './pages/searchResult/SearchResult';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import fetchData from './utils/api.js';

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    apiTest();
    genresCall();
  }, []);

  const apiTest = async () => {
    const data = await fetchData('/configuration');
    const imgUrl = {
      backdrop: data.images.secure_base_url + 'original',
      poster: data.images.secure_base_url + 'original',
      profile: data.images.secure_base_url + "original",
    }
    dispatch(setUrl(imgUrl));
  };

  const genresCall = async () =>{
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres ={}

    endPoints.forEach((url)=>{
      promises.push(fetchData(`/genre/${url}/list`))
    })

    const data =await Promise.all(promises);

    data.map(({genres})=>{
      return genres.map((item)=> (allGenres[item.id] = item))
    })

    dispatch(setGenres(allGenres))
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path='/search/:search' element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path='*' element={<PageNotFount />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
