import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import '../../index.css';

const CurrencyExchange = () => {
  const { data } = useFetch('/exchange_rates');
  const [cryptoAmount, setCryptoAmount] = useState(1);
  const [currencyAmount, setCurrencyAmount] = useState();
  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  // console.log(data)
 
 //to convert the currency every time the data changes
  useEffect(() => {
    if (data && cryptoAmount > 0) {
      handelConvert();
    }
  }, [data, cryptoAmount, selectedCrypto, selectedCurrency]);

  const handelConvert = () => {
    if (!data || !data.rates) return;

    const btcValue = data.rates[selectedCrypto]?.value || 0;
    const fiatValue = data.rates[selectedCurrency]?.value || 0;

    // Convert from selected crypto to BTC
    const amountInBtc = cryptoAmount * (1 / btcValue);

    // Convert from BTC to selected fiat currency
    const convertedAmount = amountInBtc * fiatValue;

    setCurrencyAmount(convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 }));
  };


  return (
    <section className="p-6 ">
      <h1 className="mb-8 text-4xl font-bold text-center text-gray-400 ">Cryptocurrency Converter Calculator <br /> <span className='text-sm text-gray-700'>Check the latest cryptocurrency prices against    currencies. </span></h1>
      <div className="max-w-4xl p-6 mx-auto bg-black rounded-lg shadow-lg ">
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="w-full coin-panel md:w-1/2">
            <label className="block mb-2 text-sm font-bold text-white" htmlFor="cryptoAmount">
              Enter Amount
            </label>
            <input
              type="number"
              id="cryptoAmount"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              value={cryptoAmount}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setCryptoAmount(value);
              }}
            />
            <select
              name="crypto"
              id="cryptoSelect"
              className="w-full px-4 py-2 mt-2 text-white bg-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
            >
              {Object.keys(data?.rates || {}).filter(key => data.rates[key].type === 'crypto').map((key) => (
                <option key={key} value={key}>{data.rates[key].name}</option>
              ))}
            </select>

            <select
              name="currency"
              id="currencySelect"
              className="w-full px-4 py-2 mt-2 text-white bg-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              {Object.keys(data?.rates || {}).filter(key => data.rates[key].type === 'fiat').map((key) => (
                <option key={key} value={key}>{data.rates[key].name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className={`text-white font-bold ${currencyAmount ? 'block' : 'hidden'} border-b-2 w-max mx-auto px-9 text-white text-center text-xl`}>  <span className='text-gray-600'>{cryptoAmount} {selectedCrypto} = </span> {currencyAmount} {selectedCurrency}</p>
    </section>
  );
}

export default CurrencyExchange;
