
export const formatSchedule = ( schedule ) => {
    if ( Array.isArray( schedule ) ) {
        schedule.forEach( s => {
            s.start = s.date;
            s.end = s.date;
        });
    }else{
        schedule.start = schedule.date;
        schedule.end = schedule.date;
    }
    return schedule;
}