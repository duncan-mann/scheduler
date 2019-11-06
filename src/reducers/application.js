
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_DAY_SPOTS = "SET_DAY_SPOTS";

export default function reducer(state, action) {
    switch (action.type) {
        case SET_DAY:
            return { ...state, currentDay: action.currentDay }
        case SET_APPLICATION_DATA:
            return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
        case SET_DAY_SPOTS:
            return {...state, days: action.days}
        case SET_INTERVIEW:
            return { ...state, appointments: action.appointments }
        default:
            throw new Error(
                `Tried to reduce with unsupported action type: ${action.type}`
            );
    }
}

export {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_DAY_SPOTS}