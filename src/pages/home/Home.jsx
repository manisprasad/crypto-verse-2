import React, { useEffect, useState, useCallback } from 'react'; // React imports
import { useSelector, useDispatch } from 'react-redux'; // Redux imports
import { Link } from 'react-router-dom'; // React Router import
import axios from 'axios'; // External library import
import { debounce, set } from 'lodash';

import useFetch from '../../hooks/useFetch'; // Custom hook import

import { setCoinData } from '../../store/homeSlice'; // Redux action import

import Loading from '../../components/loading/Loading'; // Custom component imports
import CoinCard from '../../components/coinCard/CoinCard';
import GlobalMarketCap from '../../components/GlobalMarketCap';
import TopThreeCoin from '../../components/highlightsCard/TopThreeCoin';
import CurrencyExchange from '../../components/currencyExchange/CurrencyExchange';
import CompanyList from '../../components/companyHolding/CompanyList';

import '../../index.css'; // CSS import


const Triangle = ({ isUp }) => {
  return <div className={`triangle ${isUp ? 'up' : 'down'}`} />;
};

const Home = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.home.currency);
  const [searchResults, setSearchResults] = useState(null);
  const [query, setQuery] = useState('');
  const [perPage, setPerPage] = useState(50);
  const [page, setPage] = useState(1);
  const [isQuery, setIsQuery] = useState(false);

  const handlePagination = (action) => {
    if (action === 'forward' && page < 16) {
      setPage((prevPage) => prevPage + 1);
    } else if (action === 'back' && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const { data, loading, error } = useFetch(`/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=${perPage}&page=${page}`);
  const globalData = useSelector((state) => state.home);
  // console.log(data)
  useEffect(() => {
    if (data) {
      dispatch(setCoinData(data));
    }
  }, [data, dispatch]);




   
   const debouncedHandleSearch = useCallback(
    debounce(async (query) => {
      if(isQuery) {
        isQuery(true);
        return;
      };
      if (query.trim().length === 0) {
        setSearchResults(null);
        setIsQuery(false);
        console.log('No query');
        return;
      }

      if (query) {
        try {
          const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);

          if (!response.ok) {
            throw new Error('No coin found');
          }

          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    }, 500),
    []
  );


  useEffect(() => {
    debouncedHandleSearch(query);
  }, [query, debouncedHandleSearch]);

    
console.log(searchResults)
  return (
    <div className='pt-5'>
      {loading && <Loading />}

      <div className={` ${loading ? 'blur' : ''} hero text-center mt-4 w-11/12 mx-auto `}>
        <h1 className='gradient-shade1'>
          Largest <br /> Crypto MarketPlace
        </h1>
        <GlobalMarketCap />

        {error && <p>Error: {error.message}</p>}
        <div className='flex flex-wrap gap-2 p-2 my-2'>
          <div className='flex-grow mx-auto overflow-hidden p-2 flex justify-center flex-col text-white shadow-md rounded-xl min-w-[300px] gap-2 '>
            <div className='flex flex-col space-y-4'>
              <div className='py-5 border rounded-lg shadow'>
                <div className='pl-2 text-2xl font-bold text-left'>
                  {globalData?.globalData?.data?.total_market_cap?.usd
                    ? `$${globalData?.globalData?.data?.total_market_cap?.usd.toLocaleString()}`
                    : 'Loading...'}
                </div>
                <div
                  className={`text-sm pl-2 flex gap-1 ${
                    globalData?.globalData?.data?.market_cap_change_percentage_24h_usd > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  <div className='text-gray-500 '>Market Cap</div>
                  <div className='flex items-center '>
                    {globalData?.globalData?.data?.market_cap_change_percentage_24h_usd > 0 ? (
                      <Triangle isUp={true} />
                    ) : (
                      <Triangle isUp={false} />
                    )}
                  </div>
                  {globalData?.globalData?.data?.market_cap_change_percentage_24h_usd !== null
                    ? `${globalData?.globalData?.data?.market_cap_change_percentage_24h_usd.toFixed(2)}%`
                    : ''}
                </div>
              </div>
              <div className='py-5 border rounded-lg shadow '>
                <div className='pl-2 text-2xl font-bold text-left'>
                  {globalData?.globalData?.data?.total_volume.usd
                    ? `$${globalData?.globalData?.data?.total_volume.usd.toLocaleString()}`
                    : 'Loading...'}
                </div>
                <div className='pl-2 text-left text-gray-500 '>24h Trading Volume</div>
              </div>
            </div>
          </div>
          <TopThreeCoin />
        </div>
        <form className='relative'>
          <div className='flex justify-end action-element'>
            <input
              className='w-full rounded-md my-2 bg-[#326eb32d] border-2 text-white border-gray-500 border-solid md:w-1/2 md:ml-0 md:text-left inp1'
              onChange={(e) => setQuery(e.target.value)}
              type='text'
              value={query}
              placeholder='🔍  Search Crypto..'
            />
          </div>
          {searchResults && (
            <div className='absolute right-0 overflow-auto max-h-96 blur-effect search-result'>
              {searchResults &&
                searchResults.coins.map((coin) => (
                  <Link to={`/coin/${coin.id}`} key={coin.id}>
                    <div className='flex gap-2 p-3 border-b-2 hover:bg-white search-result-item'>
                   
                     <p className='coin-rank'>{coin.market_cap_rank || '#'}</p>
                      <img className='' src={coin.large} alt={coin.name} />
                     
                      <p className='text-xl text-black coin-name text-bold'>{coin.name}</p>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </form>
      </div>

      <div className={`crypto-list bg-[#326eb32d] md:w-11/12 md:mx-auto w-screen md:rounded-md text-white ${loading ? 'blur' : ''}`}>
        <div className='layout custom-grid-cols'>
          <p>#</p>
          <p className='text-left'>Coins</p>
          <p className='text-right'>Price</p>
          <p className='text-right'>24H Change</p>
          <p className='hidden text-right md:block lg:block'>Market Cap</p>
        </div>
        {Array.isArray(data) ? (
          <div className='all-coin'>
            {!error &&
              data.map((item, index) => (
                <Link key={item.id} to={`/coin/${item.id}`}>
                  <CoinCard
                    number={item.market_cap_rank}
                    coinName={item.name}
                    coinImage={item.image}
                    coinPrice={item.current_price}
                    coin24hChange={item.price_change_percentage_24h}
                    coinMarketCap={item.market_cap}
                  />
                </Link>
              ))}
          </div>
        ) : (
          <p>Data is not available</p>
        )}
      </div>
      <div className={`${loading ? 'blur' : ''} pagination`}>
        <button onClick={() => handlePagination('back')}>Prev</button>
        <span className='flex items-center justify-center mx-2 text-white'>
          Page {page} of {Math.ceil(data?.length / perPage)}
        </span>
        <button onClick={() => handlePagination('forward')}>Next</button>
      </div>
      <div className={`${loading ? 'blur' : ''}`}>
        <CurrencyExchange />
      </div>

      <div  className={`${loading ? 'blur' : ''}`}>
        <h1 className='w-11/12 p-2 mx-auto text-2xl font-extrabold text-center text-gray-700 border-b-2 shadow-lg'>
          Top Five Public Companies Holdings (Bitcoin)
        </h1>
        <CompanyList coinName={'bitcoin'} />
      </div>

    </div>
  );
};

export default Home;
