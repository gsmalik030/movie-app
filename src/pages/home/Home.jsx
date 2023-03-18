import React from 'react'
import "./home.scss";
import Trending from './trending/Trending';
import HeroBanner from './heroBanner/HeroBanner';
const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner />
      <Trending />
    </div>
  )
}

export default Home
