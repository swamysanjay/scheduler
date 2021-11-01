const matchAppointments = (appointments, ids) => {
  const match = ids.map(id => appointments[id]);
  return match;
}

function getAppointmentsForDay(state, day) {

  let appointmentArr = [];
  state.days.forEach(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptId => appointmentArr.push(apptId))
    }
  })
  return matchAppointments(state.appointments, appointmentArr);
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewInfo
  }
}

module.exports = { matchAppointments, getAppointmentsForDay, getInterview };