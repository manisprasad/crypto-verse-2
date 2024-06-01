import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { setTrendingCoinData } from '../../store/homeSlice';
import { Link } from 'react-router-dom';
import CoinCard from '../../coinCard/CoinCard';

const TrendingCrypto = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch('/search/trending');
  const trendingCoins = useSelector(state => state.home.trendingCoin);

  useEffect(() => {
    if (data && data.coins) {
      dispatch(setTrendingCoinData(data.coins));
    }
  }, [data, dispatch]);

  console.log(trendingCoins);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!trendingCoins || trendingCoins.length === 0) return <p>No data available</p>;

  return (
   <section className=''>
    <div className='flex gap-4 p-3 text-sm text-white'>
        <Link to={'/'}>CryptoCurrencies</Link>
        <span>{">"}</span>
      <Link to={'/highlights'}>HighLights</Link>
      <span>{">"}</span>
        <p className='text-gray-500'>trending-crypto</p>
      </div>
    <div className='flex flex-col gap-3 p-3 ml-3 text-white'>
      
      <h1 className="text-2xl font-bold text-white gradient-shade1">Top Trending Cryptocurrencies Today</h1>
      <p className='text-sm text-gray-500'>Discover the top trending cryptocurrencies on CoinGecko. This list is sorted by coins that are most searched for in the last 3 hours. Beercoin, Sora, and Brett are the top 3 trending crypto now. In the past 24 hours, the price of Beercoin changed by 8.3%, Sora price changed by 45.2%, and Brett price changed by 5.7%.</p>
    </div>

    <div className={`crypto-list mt-3 mb-3 bg-[#326eb32d] md:w-11/12 md:mx-auto w-screen md:rounded-md text-white ${loading? 'blur': ''}`}>
        <div className="layout custom-grid-cols">
          <p>#</p>
          <p className='text-left'>Coins</p>
          <p className='text-right'>Price</p>
          <p className='text-right'>24H Change</p>
          <p className='hidden text-right md:block lg:block'>Market Cap</p>
        </div>
        {Array.isArray(trendingCoins) ? (
          <div className=" all-coin">
            {!error && trendingCoins.map((coin, index) => (
               
              <Link key={coin.id} to={`/coin/${coin.item.id}`}>
                <CoinCard
                  number={index + 1}
                  coinName={coin.item.name}
                  coinImage={coin.item.large}
                  coinPrice={coin.item.data.price}
                  coin24hChange={coin.item.data.price_change_percentage_24h.usd}
                  coinMarketCap={coin.item.data.market_cap}
                />
              </Link>
            ))}
          </div>
        ) : (
          <p>Data is not available</p>
        )}
      </div>
   </section>
  );
};

export default TrendingCrypto;
