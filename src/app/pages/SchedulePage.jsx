import React, { useEffect, useState } from 'react';
import { Calendar }  from 'react-big-calendar';
import Swal from 'sweetalert2';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { AddScheduleModal } from '../components/schedule/AddScheduleModal';
import { LoadingPage } from '../components/common/LoadingPage';
import { localizer, getMessagesES } from '../../helpers';
import { CalendarEventBox } from '../components/schedule/calendarEventBox';
import { useUiStore, useScheduleStore, useWorkersStore, useTurnsStore } from '../../hooks/';
import { FabAddNew } from '../components/schedule/FabAddNew';


export const SchedulePage = () => {
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const { openModal } = useUiStore();
    const { isLoadingSchedule, starLoadingSchedule, schedule, setActiveSchedule, errorMessage, clearErrorMessage } = useScheduleStore();
    const { startLoadingWorkers } = useWorkersStore();
    const { startLoadingTurns  } = useTurnsStore();

    useEffect(() => {
      starLoadingSchedule();
    }, []);

    useEffect(() => {
      startLoadingWorkers();
    }, []);

    useEffect(() => {
      startLoadingTurns();
    }, []);

    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire({
          title: 'Error', 
          text: errorMessage, 
          icon: 'error',
        }).then((result) => {
          clearErrorMessage();
        });
      }
    }, [errorMessage])

    const eventStyleGetter = ( event, start, end, isSelected ) => {
      const style = {
        backgroundColor: '#347CF7',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white'
      }

      return {
        style
      }

    }

    const onDoubleClick = ( event ) => {
      setActiveSchedule( event );
      console.log(event)
      openModal();
    }

    const onSelect = ( event ) => {
      console.log({ onSeclect: event })
    }

    const onViewChanged = ( event ) => {
      localStorage.setItem('lastView', event );
      setLastView( event );
    }
    
    return (
      <>
      {
        (isLoadingSchedule)
        ? <LoadingPage /> 
        : (
          <Calendar 
            culture='es'
            localizer={ localizer }
            events={ schedule }
            defaultView={ lastView }
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc( 100vh - 120px )' }}
            messages={ getMessagesES() }
            eventPropGetter={ eventStyleGetter }
            components={{
              event: CalendarEventBox 
            }}
            onDoubleClickEvent={ onDoubleClick }
            onSelectEvent={ onSelect }
            onView={ onViewChanged }
            
          />
        )
      }
      <AddScheduleModal />
      <FabAddNew />
      </>
    )
    
}
