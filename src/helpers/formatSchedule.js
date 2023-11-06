import { format, parse } from "date-fns";


export const formatSchedule = ( schedule ) => {
    if ( Array.isArray( schedule ) ) {
        schedule.forEach( s => {
            s.start = combineDateHour( s.date, s.start);
            s.end = combineDateHour( s.date, s.end);
        });
    }else{
        schedule.start = combineDateHour( schedule.date, schedule.start )
        schedule.end = combineDateHour( schedule.date, schedule.end )
    }
    return schedule;
}


const combineDateHour = ( date, hour ) => {
    const fecha = parse(date, 'dd-MM-yyyy', new Date());
    const hora = parse(hour, 'HH:mm', new Date());
    
    const dateHour = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
      hora.getHours(),
      hora.getMinutes()
    );

    return format(dateHour, 'MM-dd-yyyy HH:mm:ss');

}