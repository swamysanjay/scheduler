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

module.exports = { matchAppointments, getAppointmentsForDay };