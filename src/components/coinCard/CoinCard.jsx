import React from 'react';
// import './CoinCard.css';
import '../../index.css'
import { useSelector } from 'react-redux';
import { Sparklines, SparklinesLine } from 'react-sparklines';
// import useFetch from '../../hooks/useFetch';
// import { set } from 'lodash';


const Triangle = ({ isUp }) => (
  <div className={`triangle ${isUp ? 'up' : 'down'}`} />
);

const CoinCard = ({ number, coinName, coinImage, coinPrice, coin24hChange, coinMarketCap }) => {
  const currency = useSelector(state => state.home.currency);
  // const [spark, setSpark] = React.useState([]);

  // const getSparklineColor = (data) => {
  //   return data[data.length - 1] >= data[0] ? 'green' : 'red';
  // };


  // const options = {
  //   method: 'GET',
  //   headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-E7WL6v5wDzBXxcN11udE5pva'}
  // };
  
  // fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7', options)
  //   .then(response => response.json())
  //   .then(response => setSpark(response.prices))
  //   .catch(err => console.error(err));


  
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
