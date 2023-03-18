import React, { useRef } from 'react';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Image';
import PosterFallback from '../../assets/no-poster.png';
import CircleRating from "../circleRating/CircleRating"
import './carousel.scss';
const Carousel = ({ data, loading }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((store) => store.home);
  const navigate = useNavigate();

  const navigation = (dir) => {};
  const skItem = ()=>{
    return(
        <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
    )
  }
  return (
    <div className='carousel'>
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className='carouselLeftNav arrow'
          onClick={() => navigation('left')}
        />
        <BsFillArrowRightCircleFill
          className='carouselRighttNav arrow'
          onClick={() => navigation('right')}
        />
        {!loading ? (
          <div className='carouselItems'>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div key={item.id} className='carouselItem'>
                  <div className='posterBlock'>
                    <Img src={posterUrl} alt={item.title || item.name} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">
                        {item.title || item.name}
                    </span>
                    <span className="date">
                        {dayjs(item.release_Date).format("MMM D YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
