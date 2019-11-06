
import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
    SET_DAY,
    SET_APPLICATION_DATA,
    SET_INTERVIEW,
    SET_DAY_SPOTS
  } from "reducers/application";



export default function AppData() {


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
            dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
        }).catch((e) => console.log('error:', e))
    }, [])


    const setDay = currentDay => dispatch({ type: SET_DAY, currentDay });

    function getDayFromAppointment(id) {
        let dayId = 0;
        for (let i = 0; i <= 25; i += 5) {
            if (i < id) {
                dayId++
            } else {
                return dayId
            }
        }
    }


    function bookInterview(id, interview) {
        const dayId = getDayFromAppointment(id);

        let spots;
        if (!state.appointments[id].interview) {
             spots = state.days[dayId - 1].spots - 1;
        } else {
             spots = state.days[dayId - 1].spots;
        }


        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        let days = state.days.map((item, index) => {
            if (index !== dayId - 1) {
                return item
            }
            return {
                ...item,
                spots
            }
        })

        return axios.put(`/api/appointments/${id}`, { interview })
            .then(() => dispatch({ type: SET_INTERVIEW, appointments }))
            .then(() => dispatch({ type: SET_DAY_SPOTS, days }))

    }

    function cancelInterview(id) {
        const dayId = getDayFromAppointment(id);
        let spots = state.days[dayId - 1].spots + 1;

        const appointment = {
            ...state.appointments[id],
            interview: null
        }

        const appointments = {
            ...state.appointments,
            [id]: appointment
        }

        let days = state.days.map((item, index) => {
            if (index !== dayId - 1) {
                return item
            }
            return {
                ...item,
                spots
            }
        })

        return axios.delete(`/api/appointments/${id}`)
            .then(() => dispatch({ type: SET_INTERVIEW, appointments }))
            .then(() => dispatch({ type: SET_DAY_SPOTS, days}))
    }

    return { state, setDay, cancelInterview, bookInterview }

}

