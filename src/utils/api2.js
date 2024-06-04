import axios from 'axios';

const BASE_URL = 'https://cryptonews16.p.rapidapi.com';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '1b01edd4ddmsh7744891d2a016b2p17b5d6jsn27ce8d0756ba',
    'X-RapidAPI-Host': 'cryptonews16.p.rapidapi.com'
  }
};

export const fetchDataFromApi2 = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            ...options,
            params
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
