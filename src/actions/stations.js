import * as api from '../api/index.js';

export const getStations = () => async (dispatch) => {
  try {
    const { data } = await api.fetchStations();
    console.log({data});
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const bookSlot = (id) => async (dispatch) => {
    try {
        const {data} = await api.bookSlot(Number(id));
        console.log({data});
        dispatch({type: 'UPDATE',payload: data});
    } catch (error) {
        console.log(error);
    }
  }
