import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { numberAbbreviation } from '../utils/nuberAbbriation';
import { setGlobalData } from '../store/homeSlice';
import { useSelector, useDispatch } from 'react-redux';
import "../index.css";

const GlobalMarketCap = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch('/global');
  const globalData = useSelector((state) => state.home.globalData);

  useEffect(() => {
    if (data) {
      dispatch(setGlobalData(data));
    }
  }, [data, dispatch]);

  return (
    <div className='text-white'>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading data</p>
      ) : (
        <p>
          The global cryptocurrency market cap today is 
         <span className='p-2 text-white'> ${numberAbbreviation(globalData?.data?.total_market_cap?.usd)}</span>, and{' '}
          <span className={`${globalData?.data?.market_cap_change_percentage_24h_usd > 0 ? 'text-green-900' : 'text-red-700'}`}>
            {globalData?.data?.market_cap_change_percentage_24h_usd?.toFixed(2)}%
          </span>{' '}
          change in the last 24 hours.
        </p>
      )}
    </div>
  );
};

export default GlobalMarketCap;
