import { useReducer, useEffect } from 'react';
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_SPOTS
} from '../reducers/application'

export default function useApplicationData() {
  const [ state, dispatch ] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => {
    dispatch({
      type: SET_DAY,
      day
    })
  };

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers')),
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        data: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }
      })
    })
  },[]);

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8001/');

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'SET_INTERVIEW') {

        dispatch({
          type: SET_INTERVIEW,
          data: {
            id: data.id,
            interview: data.interview
          }
        });

        dispatch({
          type: UPDATE_SPOTS,
          data: {
            id: data.id,
            interview: data.interview
          }
        });
      }
    };
  },[]);

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, {
      id,
      interview
    })
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
};

