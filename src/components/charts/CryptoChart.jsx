import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const transformData = (data) => {
  const timestamps = data?.prices?.map(item => item[0]);
  const prices = data?.prices?.map(item => item[1]);

  return { timestamps, prices };
};

const CryptoChart = ({ data }) => {
  const { timestamps, prices } = transformData(data);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Price',
        data: prices,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'red',
        borderWidth: 2,
        pointRadius: 0, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: true,
        text: 'Crypto Prices',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour', 
        },
        title: {
          display: true,
          text: 'Time',
        },
        grid: {
            display: false,
        }
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price (USD)',
        },
        grid: {
            display: false,
        }
      },
      
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default CryptoChart;
