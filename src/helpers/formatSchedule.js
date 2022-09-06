
export const formatSchedule = ( schedule ) => {
    schedule.start = schedule.date;
    schedule.end = schedule.date;
    return schedule;
}