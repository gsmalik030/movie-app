import React, { useState, useEffect } from 'react';
import './herobanner.scss';
import useFetch from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Image from '../../../components/lazyLoadImage/Image';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
const HeroBanner = () => {
  const [search, setSearch] = useState('');
  const [background, setBackground] = useState('');
  const { data, loading } = useFetch('/movie/upcoming');
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    if (data) {
      const random = Math.floor(Math.random() * data.results.length);
      setBackground(url.backdrop + data.results[random].backdrop_path);
    }
  }, [data]);
  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.length > 0) {
      navigate(`/search/${search}`);
    }
  };
  return (
    <section className='hero__banner'>
              {!loading && 
          <div className='hero__image'>
            <Image src={background} />
          </div>
        }
        <div className="hero__opacity-layer"></div>
      <ContentWrapper>
          <div className='hero__content'>
            <h1 className='hero__title'>Welcome</h1>
            <p className='hero__text'>Millons of Movies and Tv Shows</p>
            <div className='hero__search-wrapper'>
              <input
                className='hero__search-input'
                type='text'
                placeholder='Search for a movie or tv show.....'
                onKeyUp={handleSearch}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className='hero__search-btn'>Search</button>
            </div>
          </div>
      </ContentWrapper>
    </section>
  );
};

export default HeroBanner;
