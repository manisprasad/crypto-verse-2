import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { setTrendingCoinData } from '../../store/homeSlice';
import { Link } from 'react-router-dom';

const TopThreeCoin = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch('/search/trending');
  const trendingCoins = useSelector(state => state.home.trendingCoin);

  useEffect(() => {
    if (data && data.coins) {
      dispatch(setTrendingCoinData(data.coins));
    }
  }, [data, dispatch]);

  // console.log(trendingCoins);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!trendingCoins || trendingCoins.length === 0) return <p>No data available</p>;

  return (
    <div className="flex-grow mx-auto overflow-hidden text-white bg-gray-900 shadow-md rounded-xl min-w-[300px]">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-2 text-2xl">🔥</span>
            <h2 className="text-lg font-bold">Trending</h2>
          </div>
          <Link to="/highlights/trending-coins" className="text-blue-500">View more &gt;</Link>
        </div>
        <ul className="mt-4">
          {trendingCoins.slice(0, 3).map((coin, index) => {
            const priceChange = coin.item.data.price_change_percentage_24h.aud;            ;
            const priceChangeFormatted = typeof priceChange === 'number' ? priceChange.toFixed(2) : 'N/A';

            return (
              <li key={index} className="flex items-center justify-between py-2 border-gray-200">
                <div className="flex items-center">
                  <img className="w-8 h-8 mr-2 bg-gray-200 rounded-full" src={coin.item.large} alt={coin.item.name} />
                  <span>{coin.item.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">${coin.item.data.price.toFixed(2)}</span>
                  <span className={parseFloat(priceChange) > 0 ? 'text-green-500' : 'text-red-500'}>
                    {priceChangeFormatted}%
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TopThreeCoin;
