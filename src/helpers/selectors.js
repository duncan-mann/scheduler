

export function getAppointmentsForDay(state, day) {
    let appointments = [];

    const filteredDay = state.days.filter(obj => obj.name === day);

    if (filteredDay.length > 0) {
        for (let each of filteredDay[0].appointments) {
            if (state.appointments[each]) {
                appointments.push(state.appointments[each.toString()])
            }
        }
    }

    return appointments;
}

export function getInterviewersForDay(state, day) {
    let interviewers = [];

    const filteredDay = state.days.filter(obj => obj.name === day);

    if (filteredDay.length > 0) {
        for (let each of filteredDay[0].interviewers) {
                interviewers.push(state.interviewers[each])
            }
        }
        return interviewers;
}

export function getInterview(state, interview) {
    let results = {};
    if (!interview) return null;
    results.student = interview.student;
    results.interviewer = state.interviewers[interview.interviewer]
    return results;
}



