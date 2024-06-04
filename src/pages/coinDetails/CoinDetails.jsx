import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/loading/Loading';
import './CoinDetails.css'
import '../../index.css'
import { FaThumbsUp, FaArrowRight, FaThumbsDown, FaTwitter, FaGithub,FaArrowDown,FaArrowUp } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si'; // Update import for Ethereum icon
import { GiWallet } from 'react-icons/gi';
import NewsComponent from '../../components/news/NewsComponent';
import CryptoChart from '../../components/charts/CryptoChart';

const Triangle = ({ isUp }) => {
  return <div className={`w-0 h-0 ${isUp ? 'border-l-4 border-r-4 border-b-8 border-transparent border-b-green-500' : 'border-l-4 border-r-4 border-t-8 border-transparent border-t-red-500'}`}></div>;
};

const CoinDetails = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const { coinId } = useParams();
  const [days, setDays] = useState(1)


 
    const handleClick = (day) =>{
      setDays(day);
    }


  const { data, loading, error } = useFetch(`/coins/${coinId}`);
  const {data: chartData, loading: chartLoading, error: chartError} = useFetch(`/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`);
console.log(chartData);


  if (loading ) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  if (!data) return null;
  console.log(data)

  const priceChange = data?.market_data?.price_change_percentage_24h;
  const isUp = priceChange > 0;

  return (
    <section className={`coin-details ${loading ? ' blur-effect' : ''} p-4`}>
      <h1 className='text-xl font-bold text-white'>{data.name} ({data.symbol.toUpperCase()})</h1>

      <div className='relative flex gap-4 p-5 mb-8 bg-white rounded-lg h-52 md:h-max sm:flex-col bg-opacity-20 backdrop-blur-md'>
     <div className='flex items-center'>
     <img src={data.image.large} alt={data.name} className='w-6 h-6 rounded-full md:w-12 md:h-12' />
        
        <div className="flex flex-col">
          <p className='text-4xl font-bold text-black'>${data?.market_data?.current_price?.usd}</p>
          <div className='flex items-center'>
            <Triangle isUp={isUp} />
            <p className={`${isUp ? 'text-green-500' : 'text-red-500'} font-bold ml-2`}>
              {priceChange.toFixed(2)}%
            </p>
          </div>
        </div>
     </div>

        <p className='absolute text-sm top-2 right-2'>Market Cap Rank: #{data.market_cap_rank}</p>
        <div className='absolute flex gap-4 bottom-2 right-2'>
          <div className='flex items-center gap-1 p-2 bg-white rounded-full'>
            <FaThumbsDown className='text-red-500' />
            <p>{data?.sentiment_votes_down_percentage}%</p>
          </div>
          <div className='flex items-center gap-1 p-2 bg-white rounded-full'>
            <FaThumbsUp className='text-green-500' />
            <p>{data?.sentiment_votes_up_percentage}%</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 description">
      <div className='text-black'>
        {showFullDescription ? (
          <div dangerouslySetInnerHTML={{ __html: data?.description?.en }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: `${data?.description?.en.slice(0, 100)}...` }} />
        )}
      </div>
      <button className='border-b-2' onClick={toggleDescription}>
        {showFullDescription ? 'Show Less' : 'Read More'}
      </button>
    </div>
{/* //charts will shown here */}
<div className={`chart ${chartLoading ? 'blur-sm': ''} `}>
<div className='flex items-center justify-center gap-2 px-1 m-2 ml-auto rounded-md glass w-max '>
      <button
        className="px-4 py-2 text-white transition duration-300 ease-in-out transform bg-gray-400 border border-gray-300 border-solid rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:bg-gray-500 hover:scale-105"
        onClick={() => handleClick(1)}
      >
        24h
      </button>
      <button
        className="px-4 py-2 text-white transition duration-300 ease-in-out transform bg-gray-400 border border-gray-300 border-solid rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:bg-gray-500 hover:scale-105"
        onClick={() => handleClick(7)}
      >
        7d
      </button>
      <button
        className="px-4 py-2 text-white transition duration-300 ease-in-out transform bg-gray-400 border border-gray-300 border-solid rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:bg-gray-500 hover:scale-105"
        onClick={() => handleClick(30)}
      >
        1m
      </button>
      <button
        className="px-4 py-2 text-white transition duration-300 ease-in-out transform bg-gray-400 border border-gray-300 border-solid rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:bg-gray-500 hover:scale-105"
        onClick={() => handleClick(90)}
      >
        3m
      </button>
      <button
        className="px-4 py-2 text-white transition duration-300 ease-in-out transform bg-gray-400 border border-gray-300 border-solid rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:bg-gray-500 hover:scale-105"
        onClick={() => handleClick(365)}
      >
        1y
      </button>
    </div>
  


  <div className="flex flex-row flex-wrap ">

     
      <div className="relative w-full mb-2 bg-gray-300 rounded-md shadow-lg h-max chart">
     
      
        <CryptoChart data={chartData} />
      </div>



      </div>
</div>
{chartLoading && <Loading/>}


<div className="flex flex-wrap items-center justify-end p-2 border-2 rounded-lg shadow-lg h-max glass">
    
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col items-center">
        <FaArrowDown className="text-2xl text-red-500" />
        <span className="text-lg text-gray-600">24h Low</span>
        <span className="text-2xl font-semibold text-red-500">${data?.market_data?.low_24h?.usd?.toLocaleString()}</span>
      </div>
      <div className="w-1/6 h-1 mx-4 bg-gray-300" />
      <div className="flex flex-col items-center">
        <FaArrowUp className="text-2xl text-green-500" />
        <span className="text-lg text-gray-600">24h High</span>
        <span className="text-2xl font-semibold text-green-500">${data?.market_data?.high_24h.usd?.toLocaleString()}</span>
      </div>
    </div>
  </div>



















      <div className="flex flex-col flex-wrap justify-between gap-4 p-2 mt-3 bg-white rounded-md md:max-h-96 md:flex-row">
    <div className="flex flex-col justify-between flex-1 p-2 border-r-2 max-w-1/2">
      <p className='flex justify-between p-2 font-semibold border-b-2'>
        Market Cap: <span className="font-bold">${data?.market_data?.market_cap?.usd?.toLocaleString()}</span>
      </p>
      <p className='flex justify-between p-2 font-semibold border-b-2'>
        Fully Diluted Valuation: <span className="font-bold">${data?.market_data?.fully_diluted_valuation?.usd?.toLocaleString()}</span>
      </p>
      <p className='flex justify-between p-2 font-semibold border-b-2'>
        24 Hour Trading Vol: <span className="font-bold">${data?.market_data?.total_volume?.usd?.toLocaleString()}</span>
      </p>
      <p className='flex justify-between p-2 font-semibold border-b-2'>
        Circulating Supply: <span className="font-bold">{data?.market_data?.circulating_supply?.toLocaleString()}</span>
      </p>
      <p className='flex justify-between p-2 font-semibold border-b-2'>
        Total Supply: <span className="font-bold">{data?.market_data?.total_supply?.toLocaleString()}</span>
      </p>
      <p className='flex justify-between p-2 font-semibold border-b-2'>
        Max Supply: <span className="font-bold">{data?.market_data?.max_supply ? data?.market_data?.max_supply?.toLocaleString() : '∞'}</span>
      </p>
    </div>

    <div className="flex-1 p-2 overflow-auto md:max-h-80">
      <h1 className='font-bold border-b-2 w-max'>Info</h1>
      <div className="flex items-center justify-between gap-3 p-2 mb-2 border-b-2">
        <span className="font-bold">Website:</span>
        <a href={data?.links?.homepage[0]} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 ml-1 text-blue-500 border-2 glass rounded-xl">
          {data?.name}
          <FaArrowRight className="ml-2" />
        </a>
      </div>
      <div className="flex items-center justify-between gap-3 p-2 mb-2 border-b-2">
        <div className="flex items-center">
          <SiEthereum className='mr-1 text-gray-700' />
          <span className="font-bold">Explorers:</span>
        </div>
        <a href={data?.links?.blockchain_site[0]} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 ml-1 text-blue-500 border-2 glass rounded-xl">
          Etherscan
          <FaArrowRight className="ml-2" />
        </a>
      </div>
      <div className="flex items-center justify-between gap-3 p-2 mb-2 border-b-2">
        <div className="flex items-center">
          <GiWallet className='mr-1 text-gray-700' />
          <span className="font-bold">Wallets:</span>
        </div>
        <a href="https://www.ledger.com" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 ml-1 text-blue-500 border-2 glass rounded-xl">
          Ledger
          <FaArrowRight className="ml-2" />
        </a>
      </div>
      <div className="flex items-center justify-between gap-3 p-2 mb-2 border-b-2">
        <div className="flex items-center">
          <FaTwitter className='mr-1 text-blue-500' />
          <span className="font-bold">Community:</span>
        </div>
        <a href={`https://twitter.com/${data?.links?.twitter_screen_name}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 ml-1 text-blue-500 border-2 glass rounded-xl">
          Twitter
          <FaArrowRight className="ml-2" />
        </a>
      </div>
      <div className="flex items-center justify-between gap-3 p-2 mb-2 border-b-2">
        <div className="flex items-center">
          <FaTwitter className='mr-1 text-blue-500' />
          <span className="font-bold">Search on:</span>
        </div>
        <a href={`https://twitter.com/search?q=${data.name}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 ml-1 text-blue-500 border-2 glass rounded-xl">
          Twitter
          <FaArrowRight className="ml-2" />
        </a>
      </div>
      <div className="flex items-center justify-between gap-3 p-2 mb-2 border-b-2">
        <div className="flex items-center">
          <FaGithub className='mr-1 text-gray-700' />
          <span className="font-bold">Source Code:</span>
        </div>
        <a href={data?.links?.repos_url?.github[0]} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 ml-1 text-blue-500 border-2 glass rounded-xl">
          Github
          <FaArrowRight className="ml-2" />
        </a>
      </div>
    </div>
  </div>


  <div className="news">
    <NewsComponent coinId={coinId}/>
  </div>
    </section>
  );
};

export default CoinDetails;
