import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import VidepPopup from "../../../components/videoPopup/VideoPopup"
import './style.scss';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import useFetch from '../../../hooks/useFetch';
import Genres from '../../../components/genres/Genres';
import CircleRating from '../../../components/circleRating/CircleRating';
import Image from '../../../components/lazyLoadImage/Image.jsx';
import PosterFallback from '../../../assets/no-poster.png';
import { PlayIcon } from '../Playbtn';
const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false)
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((store) => store.home);
  const _genres = data?.genres?.map((item) => item.id);
  const director = crew?.filter((e) => e.job === 'Director');
  const writer = crew?.filter(
    (e) => e.job === 'Screenplay' || e.job === 'Story' || e.job === 'Writer'
  );
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  };

  return (
    <div className='detailsBanner'>
      {!loading ? (
        <>
          {data && (
            <React.Fragment>
              <div className='backdrop-img'>
                <Image src={url.backdrop + data.backdrop_path} />
              </div>
              <div className='oppacity-layer' />
              <ContentWrapper>
                <div className='content'>
                  <div className='left'>
                    {data.poster_path ? (
                      <Image
                        className='posterImg'
                        src={url.backdrop + data.backdrop_path}
                      />
                    ) : (
                      <Image className='posterImg' src={PosterFallback} />
                    )}
                  </div>
                  <div className='right'>
                    <div className='title'>
                      {`${data.name || data.title} (${dayjs(
                        data.release_date
                      ).format('YYYY')})`}
                    </div>
                    <div className='subtitle'>{data.tagline}</div>
                    <Genres data={_genres} />
                    <div className='row'>
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div onClick={() => {
                        setShow(true)
                        setVideoId(video.key)
                      }} className='playbtn'>
                        <PlayIcon />
                        <span className='text'> Watch Trailer</span>
                      </div>
                    </div>
                    <div className='overview'>
                      <h3 className='heading'>Overview</h3>
                      <p className='description'>{data.overview}</p>
                    </div>
                    <div className='info'>
                      {data.status && (
                        <div className='infoItem'>
                          <span className='text bold'>Status: </span>
                          <span className='text'>{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className='infoItem'>
                          <span className='text bold'>Release date: </span>
                          <span className='text'>
                            {dayjs(data.release_date).format('MMM D, YYYY')}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className='infoItem'>
                          <span className='text bold'>Run Time: </span>
                          <span className='text'>
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className='info'>
                        <span className='text bold'>Director: </span>
                        <span className='text'>
                          {director?.map((item, index) => (
                            <span key={index}>{item.name}
                            {director.length - 1 !== index && ", "}</span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className='info'>
                        <span className='text bold'>Writer: </span>
                        <span className='text'>
                          {writer?.map((item, index) => (
                            <span key={index}>{item.name}
                            {writer.length - 1 !== index && ", "}</span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data.created_by?.length > 0 && (
                      <div className='info'>
                        <span className='text bold'>Created By: </span>
                        <span className='text'>
                          {data.created_by?.map((item, index) => (
                            <span key={index}>{item.name}
                            {data.created_by.length - 1 !== index && ", "}</span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VidepPopup 
                show= {show}
                setShow = {setShow}
                videoId = {videoId}
                setVideoId = {setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className='detailsBannerSkeleton'>
          <ContentWrapper>
            <div className='left skeleton'></div>
            <div className='right'>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
