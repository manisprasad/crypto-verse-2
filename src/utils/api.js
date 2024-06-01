import axios from "axios";

const BASE_URL = 'https://api.coingecko.com/api/v3';
const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-E7WL6v5wDzBXxcN11udE5pva'}
  };

export const fetchDataFromApi = async (url, params) =>{
    try {
        const {data} = await axios.get(BASE_URL + url, options);
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}