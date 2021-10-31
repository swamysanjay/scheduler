const matchAppointments = (appointments, ids) => {
  const match = ids.map(id => appointments[id]);
  return match;
}

export function getAppointmentsForDay(state, day) {
  let appointmentArr = [];
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptId => appointmentArr.push(apptId))
    }
  })
  return matchAppointments(state.appointments, appointmentArr);
}

module.exports = { getAppointmentsForDay };