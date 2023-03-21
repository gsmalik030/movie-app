import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import './searchResults.scss';
import fetchData from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import noResult from '../../assets/no-results.png';
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCard'
const SearchResult = () => {
  const { search } = useParams();
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchInitialData = async () => {
    setLoading(true);
    const res = await fetchData(
      `/search/multi?query=${search}&page=${pageNumber}`
    );
    setData(res);
    setPageNumber((prev) => prev + 1);
    setLoading(false);
  };

  const fetchNextPageData = async () => {
    const res = await fetchData(
      `/search/multi?query=${search}&page=${pageNumber}`
    );
    if (data?.results) {
      setData({
        ...data,
        results: [...data?.results, ...res.results],
      });
    } else {
      setData(res);
    }
    setPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    setPageNumber(1)
    fetchInitialData();
  }, [search]);

  return (
    <section className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results.length > 0 ? (
            <>
            <div className="pageTitle">
              {`Search ${data.total_results > 1 ? "results" : "result"} of '${search}'`}
            </div>
            <InfiniteScroll 
            className='content'
            dataLength={data?.results.length || []}
            next =  {fetchNextPageData}
            hasMore={pageNumber<=data?.total_pages}
            loader ={<Spinner />}
            >
              {data?.results.map((item, index)=>{
                if(item.media_type === "person") return;
                return(
                  <MovieCard  key={index} data={item} fromSearch={true} />
                )
              })}
            </InfiniteScroll>
            </>
          ) : (
            <span className='resultNotFound'>
              Sorry, No Results Fount
            </span>
            )}
        </ContentWrapper>
      )}
    </section>
  );
};

export default SearchResult;
