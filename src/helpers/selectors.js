// if the day selected is Monday, get all the appointments scheduled on that day
export function getAppointmentsForDay(state, dayName) {
  const result = [];
  const day = state.days.filter(day => day.name === dayName);
  if (day.length > 0) {
    const appointmentIds = day[0].appointments;

    for (let appointmentId of appointmentIds) {
      result.push(state.appointments[appointmentId])
    }
  }
  return result;
};

// replaces the interviewer id with the actual interviewer object
export function getInterview(state, interview) {
  if (!interview) return null;

  const result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  }
  return result;
}

// if the day is monday, get all the interviewers for monday
export function getInterviewersForDay(state, dayName) {
  const result = [];
  const day = state.days.filter(day => day.name === dayName);
  let interviewIds;

  if (day.length > 0) {
    interviewIds = day[0].interviewers;

    for (let interviewId of interviewIds) {
      result.push(state.interviewers[interviewId])
    }
  }
  return result;
}