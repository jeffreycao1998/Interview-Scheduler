import { useReducer, useEffect } from 'react';
import axios from 'axios';


export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const UPDATE_SPOTS = "UPDATE_SPOTS";

  const [ state, dispatch ] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  function reducer(state, action) {
    switch (action.type) {

      case SET_DAY: {
        const day = { action }
        return { 
          ...state, 
          day 
        };
      }

      case SET_APPLICATION_DATA: {
        const { days, appointments, interviewers } = action.data;
        return { 
          ...state, 
          days, 
          appointments, 
          interviewers 
        };
      }

      case SET_INTERVIEW: {
        const { id, interview } = action.data;

        const appointment = {
          ...state.appointments[id],
          interview: interview
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        return {
          ...state,
          appointments: { ...appointments }
        };
      }

      case UPDATE_SPOTS: {
        const days = state.days.map(day => {
          if (day.name === state.day) {
            day.spots = day.appointments.filter(appointmentId => {
              return state.appointments[appointmentId].interview === null;
            }).length - 1;
          }
          return day;
        });
        return {
          ...state,
          days: [...days]
        };
      }

      default: {
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
      }
    }
  }

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

