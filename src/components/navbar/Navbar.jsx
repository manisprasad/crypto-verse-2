import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { setCurrency } from '../../store/homeSlice';
import numberAbbreviation from '../../utils/nuberAbbriation';
import "../../index.css";

const Triangle = ({ isUp }) => {
  return <div className={`triangle ${isUp ? 'up' : 'down'}`} />;
};

const Navbar = () => {
  const [path, setPath] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const data = useSelector((state) => state.home);
  console.log(data);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  const onCurrencyChange = (e) => {
    dispatch(setCurrency({
      name: e.target.value,
      symbol: e.target.value === 'USD' ? '$' : e.target.value === 'INR' ? '₹' : '€'
    }));
  };

  return (
    <nav className='fixed top-0 flex items-center justify-between w-screen h-10 px-2 rounded-none blur-effect'>
      <div className='flex gap-2 pl-2'>
        <p className='text-sm text-white'>
          Coins: <b>{data.globalData?.data?.active_cryptocurrencies}</b>
        </p>
        <p className='text-sm text-white'>
          Market Cap: <b>${numberAbbreviation(data.globalData?.data?.total_market_cap?.usd)}</b>
        </p>
        <div className='flex items-center gap-1 text-sm text-white'>
          <span>24h Volume:</span>
          <div className='flex items-center gap-1'>
            <Triangle isUp={data.globalData?.data?.market_cap_change_percentage_24h_usd > 0} />
            <span className={`${data.globalData?.data?.market_cap_change_percentage_24h_usd > 0 ? 'text-green-900' : 'text-red-700'}`}>
              {data.globalData?.data?.market_cap_change_percentage_24h_usd?.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
      <div className={`flex gap-3 pr-3 ${path === '/' ? 'block' : 'hidden'}`}>
        <select onChange={onCurrencyChange} defaultValue="USD">
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
        </select>
        {/* <button type="button">Sign up</button> */}
      </div>
    </nav>
  );
};

export default Navbar;
