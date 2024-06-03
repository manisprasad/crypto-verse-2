import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import '../../index.css';

function CoinDetails({ coinid }) {
  const { data, loading, error } = useFetch(`/coins/${coinid}`);
  const [cosmosData, setCosmosData] = useState(null);
  console.log(data);

  useEffect(() => {
    if (data) {
      setCosmosData(data);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  if (!cosmosData) {
    return null; // or a fallback UI
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="my-4 text-3xl font-bold text-center">{cosmosData?.name}</h1>
      <CosmosCard data={cosmosData} />
      <CosmosStats data={cosmosData} />
      <CosmosLinks data={cosmosData} />
    </div>
  );
}

function CosmosCard({ data }) {
  return (
    <div className="max-w-sm mx-auto my-4 overflow-hidden rounded shadow-lg">
      <img className="w-full" src={data?.image?.large} alt={data?.name} />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{data?.name} ({data?.symbol?.toUpperCase()})</div>
        <p className="text-base text-gray-700">{data?.description?.en}</p>
      </div>
    </div>
  );
}

function CosmosStats({ data }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Market Cap Rank</h2>
        <p>{data?.market_cap_rank}</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Current Price</h2>
        <p>${data?.market_data?.current_price?.usd}</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Twitter Followers</h2>
        <p>{data?.community_data?.twitter_followers}</p>
      </div>
      {/* Add more stats as needed */}
    </div>
  );
}

function CosmosLinks({ data }) {
  return (
    <div className="p-4 my-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Links</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data?.links?.homepage?.map((link, index) => (
          <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {link}
          </a>
        ))}
        {/* Add more links as needed */}
      </div>
    </div>
  );
}

export default CoinDetails;
