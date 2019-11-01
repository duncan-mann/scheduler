
import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_DAY_SPOTS = "SET_DAY_SPOTS"


export default function AppData() {
    
    function reducer(state, action) {
        switch (action.type) {
            case SET_DAY:
                return {...state, currentDay: action.currentDay }
            case SET_APPLICATION_DATA: 
                return {...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers}
            case SET_DAY_SPOTS:
                return {...state, days: state.days.map((item, index) => {
                    if (index !== action.index) {
                      return item
                    }
                    return {
                         ...item,
                         ...action.spots
                    }
                  })}
            case SET_INTERVIEW: 
                return {...state, appointments: action.appointments}
            default:
                throw new Error(
                    `Tried to reduce with unsupported action type: ${action.type}`
                );
        }
    }

    
        const [state, dispatch] = useReducer(reducer, {
            currentDay: "Monday",
            days: [],
            appointments: {},
            interviewers: {}
        });

    useEffect(() => {
        Promise.all([
            axios.get('api/days'),
            axios.get('api/appointments'),
            axios.get('api/interviewers')
        ]).then((all) => {
            dispatch({type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
        }).catch((e) => console.log('error:', e))
    }, [])


    const setDay = currentDay => dispatch({ type: SET_DAY, currentDay });

    function getDayFromAppointment(id) {
        let dayId = 0;
        for (let i = 0; i <= 25; i+= 5) {
            if (i < id) {
                dayId++
            } else {
                return dayId
            }
        }
    }


    function bookInterview(id, interview) {
        const dayId = getDayFromAppointment(id);
        console.log('day', state.days[dayId], "appId", id)
        let spots = state.days[dayId - 1].spots--;

        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        return axios.put(`/api/appointments/${id}`, { interview })
            .then(() => dispatch({ type: SET_INTERVIEW, appointments }))
            .then(() => dispatch({type: SET_DAY_SPOTS, index: dayId - 1, spots}))

    }

    function cancelInterview(id) {
        const dayId = getDayFromAppointment(id);
        let spots = state.days[dayId - 1].spots++;



        const appointment = {
            ...state.appointments[id],
            interview: null
        }

        const appointments = {
            ...state.appointments,
            [id]: appointment
        }

        return axios.delete(`/api/appointments/${id}`)
            .then(() => dispatch({ type: SET_INTERVIEW, appointments }))
            .then(() => dispatch({type: SET_DAY_SPOTS, index: dayId - 1, spots}))
    }

    return { state, setDay, cancelInterview, bookInterview }

}

