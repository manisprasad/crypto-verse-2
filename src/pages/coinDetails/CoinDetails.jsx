import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './CoinDetails.css';

const CoinDetails = () => {
  const { coinId } = useParams();
  const { data, loading, error } = useFetch(`/coins/${coinId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data) return null;

  return (
    <section className='coin-details'>
      <p className='nav'><b>Crypto</b> {'>'} {coinId}</p>
      <div className='coin-header glass'>
        <img src={data.image.large} alt={data.name} className='coin-image glass' />
        <h1 className='glss'>{data.name} ({data.symbol.toUpperCase()})</h1>
        <p className='market-rank'>Market Cap Rank: #{data.market_cap_rank}</p>
      </div>

    
    </section>
  );
};

export default CoinDetails;
