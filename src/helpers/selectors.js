
const getAppointmentsForDay = function (state, day) {
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

module.exports.getAppointmentsForDay = getAppointmentsForDay