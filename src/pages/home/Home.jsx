import React from 'react'
import "./home.scss";
import Trending from './trending/Trending';
import HeroBanner from './heroBanner/HeroBanner';
import Popular from './popular/popular';
import TopRated from './topRated/TopRated';
const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home
