export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const UPDATE_SPOTS = "UPDATE_SPOTS";

export default function reducer(state, action) {
  switch (action.type) {

    case SET_DAY: {
      const { day } = action
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
          }).length;
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