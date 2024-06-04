import React, { useState, useEffect } from 'react';
import useFetch2 from '../../hooks/useFetch2';
// import {fetchDataFromApi2} from '../../utils/api2.js'

const NewsComponent = ({ coinId }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // const {data, loading, error} = useFetch2(`/news`);
  // console.log(data);

  // if(loading) return <div className='text-center'>Loading...</div>;
  // if(error) return <div className='text-center'>Error: {error.message}</div>;





  // useEffect(() => {
  //   const fetchNews = async () => {
  //     const url = 'https://cryptonews16.p.rapidapi.com/news';
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         'X-RapidAPI-Key': '1b01edd4ddmsh7744891d2a016b2p17b5d6jsn27ce8d0756ba',
  //         'X-RapidAPI-Host': 'cryptonews16.p.rapidapi.com'
  //       }
  //     };
      
  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.json();
  //       setNews(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
      
  //   }

  //   fetchNews();
  // }, [coinId]);
// console.log(news)
  if (loading) return <div className='text-center'>Loading...</div>;
  return (
    <div className="news">
      <h2>News Related to {coinId}</h2>
      <ul>
        {news?.map((item, index) => (
          <li key={index}>
            <a href={item?.url} target="_blank" rel="noopener noreferrer">{item?.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsComponent;
