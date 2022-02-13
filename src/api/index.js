import axios from 'axios';

const url = 'http://localhost:5000/stations';

export const fetchStations = () => axios.get(url);
export const bookSlot = (id) => axios.post(`${url}/${id}/bookSlot`);

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
