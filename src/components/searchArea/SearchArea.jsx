import React from 'react'
import { Link } from 'react-router-dom'
import './SearchArea.css'

const SearchArea = ({ result }) => {
  return (
    <div className="container">
      {result && result.coins.map((coin) => (
        <Link to={`/coin/${coin.id}`} key={coin.id}>
          <div className="search-result-item">
            <img src={coin.thumb} alt={coin.name} />
            <span className="coin-rank">{coin.market_cap_rank}</span>
            <span className="coin-name">{coin.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchArea;
