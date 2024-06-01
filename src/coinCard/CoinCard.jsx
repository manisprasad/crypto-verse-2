import React from 'react';
// import './CoinCard.css';
import '../index.css'
import { useSelector } from 'react-redux';


const Triangle = ({ isUp }) => (
  <div className={`triangle ${isUp ? 'up' : 'down'}`} />
);

const CoinCard = ({ number, coinName, coinImage, coinPrice, coin24hChange, coinMarketCap }) => {
  const currency = useSelector(state => state.home.currency);

  // Ensure that the coinPrice and other numeric values are correctly converted to locale strings
  return (
    <div className="w-full gap-2 custom-grid-cols">
      <div className="number">{number}</div>
      <div className="flex items-center coin-info">
        <img src={coinImage} alt={`${coinName} logo`} className="mr-2 w-7 h-7 coin-image" />
        <span className="font-bold coin-name">{coinName}</span>
      </div>
      <div className="text-right coin-price">
        {currency.symbol}{coinPrice.toFixed(2)}
      </div>
      <div style={{ color: coin24hChange < 0 ? 'red' : 'inherit' }} className="flex items-center justify-end gap-2 text-right coin-24h-change">
        {coin24hChange > 0 ? <Triangle isUp={true} /> : <Triangle isUp={false} />}
        {coin24hChange.toFixed(2)}%
      </div>

      <div  className="hidden text-right coin-market-cap md:block lg:block">
       {currency.symbol}{coinMarketCap.toLocaleString()}
      </div>
    </div>
  );
};

export default CoinCard;
