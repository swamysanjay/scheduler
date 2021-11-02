const matchAppointments = (appointments, ids) => {
  return ids.map(id => appointments[id]);
}

function getAppointmentsForDay(state, day) {

  let appointmentsArr = [];
  state.days.forEach(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptId => appointmentsArr.push(apptId))
    }
  })
  return matchAppointments(state.appointments, appointmentsArr);
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

function getInterviewersForDay(state, day) {
  let interviewArr = [];
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.interviewers.forEach(interviewerId => interviewArr.push(interviewerId))
    }
  })
  return matchAppointments(state.interviewers, interviewArr);
}

module.exports = { matchAppointments, getAppointmentsForDay, getInterview, getInterviewersForDay };