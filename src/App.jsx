import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import CoinDetails from './pages/coinDetails/CoinDetails';
import PageNotFound from './pages/404/PageNotFound';
import TrendingCrypto from './pages/highlights/TrendingCrypto';
import HighLights from './pages/highlights/HighLights';

import './index.css';

import Navbar from './components/navbar/Navbar';
import Footer from './components/navbar/Footer';
const App = () => {
 
  return (
    <div className='app'>
      <Navbar />
    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:coinId' element={<CoinDetails />} />
        <Route path='/highlights/trending-coins' element={<TrendingCrypto />} />
        <Route path='/highlights' element={<HighLights />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <Footer/>
    </div>
  );
};

export default App;
