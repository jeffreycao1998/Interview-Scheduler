import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from '../components/DayList';
import Appointment from './Appointment';
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors.js'

export default function Application(props) {
  const [ state, setState ] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => {
    setState({
      ...state,
      day
    })
  };

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers')),
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }))
    })
  }, [])

  const bookInterview = (id, interview, transition, MODE) => {
    const appointment = {
      ...state.appointments[id],
      inteview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    axios.put(`/api/appointments/${id}`, {
      id,
      interview
    })
    .then(() => {
      setState(prev => ({ ...prev, appointments }));
      transition(MODE);
    });
  };

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          schedule.map(appointment => appointment)
        }
      </section>
    </main>
  );
}
