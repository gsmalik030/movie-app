import React, { useState, useEffect } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from 'react-icons/sl';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate, useLocation } from 'react-router-dom';
import './header.scss';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from '../../assets/logo.png';
const Header = () => {
  const [show, setShow] = useState('top');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const controlNavEffect= ()=>{
    if (window.scrollY>200){
      
    }
  }

  useEffect(() =>{
    window.addEventListener("scroll", controlNavEffect);
    return ()=>{
      window.removeEventListener("scroll",controlNavEffect )
    }
  },[lastScrollY])

  const opemMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.length > 0) {
      navigate(`/search/${search}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const handleNavigation = (type) => {
    if (type === 'movie') {
      navigate('/explore/movie');
    } else {
      navigate('/explore/tvShow');
    }
    setMobileMenu(false)
  };

  return (
    <header className={`header ${mobileMenu ? 'mobileView' : ''} ${show}`}>
      <ContentWrapper>
        <div className='logo'>
          <img src={logo} alt='' />
        </div>
        <ul className='menuItems'>
          <li className='menuItem' onClick={() => handleNavigation('movie')}>
            Movies
          </li>
          <li className='menuItem' onClick={() => handleNavigation('tvShow')}>
            Tv Shows
          </li>
          <li className='menuItem'>
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className='mobileMenuItems'>
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={opemMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className='searchBar'>
          <ContentWrapper>
            <div className='searchInput'>
              <input
                className='hero__search-input'
                type='text'
                placeholder='Search for a movie or tv show.....'
                onKeyUp={handleSearch}
                onChange={(e) => setSearch(e.target.value)}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
