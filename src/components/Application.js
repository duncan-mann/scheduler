import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment";
import { tsObjectKeyword } from "@babel/types";

export default function Application(props) {
  let [currentDay, setDay] = useState('Monday');
  let [days, setDays] = useState([]);

  useEffect(()=> {
    axios.get('api/days')
      .then(response => {
        setDays(response.data);
      })
  }, [])

  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Juan",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "2pm",
    },
    {
      id: 4,
      time: "3pm",
      interview: {
        student: "Mike",
        interviewer: {
          id: 1,
          name: "Mildred Nazir",
          avatar: "https://i.imgur.com/T2WwVfS.png",
        }
      }
    }
  ];


  const _appointments = appointments.map(appointment => 
      <Appointment key={appointment.id} {...appointment} />
    )
  


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
            days={days}
            day={currentDay}
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
        {_appointments}
        <Appointment key="last" time="4pm" />
      </section>
    </main>
  );
}
