import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState(prev => ({...prev, day}));
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  function updateSpots(newAppointments) {
    return state.days.map((day) => {
      let freeSpots = 0;

      for (let key of day.appointments) {
        if (!newAppointments[key].interview) {
          freeSpots++;
        }
      } 
      return { ...day, spots: freeSpots }
    })
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(setState({...state, appointments, days: updateSpots(appointments)}))
  }
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
  
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(setState({...state, appointments, days: updateSpots(appointments)}))
  }
  return { state, setDay, bookInterview, cancelInterview };
}


// function findDay(day) {
  //   const daysOfWeek = {
  //     Monday: 0,
  //     Tuesday: 1,
  //     Wednesday: 2,
  //     Thursday: 3,
  //     Friday: 4
  //   }
  //   return daysOfWeek[day]
  // }

// const dayOfWeek = findDay(state.day)

    // let day = {
    //   ...state.days[dayOfWeek],
    //   spots: state.days[dayOfWeek]
    // }

    // if(!state.appointments[id].interview) {
    //   setState(prev => ({
    //     ...prev, 
    //     days: {
    //       ...prev.days, 
          
    //     } 
    //   }))
    //   day = {
    //     ...state.days[dayOfWeek].spots -1
    //   }
    // } else {
    //   day = {
    //     ...state.days[dayOfWeek],
    //     spots: state.days[dayOfWeek].spots
    //   }
    // }

    // state.days[dayOfWeek] = day