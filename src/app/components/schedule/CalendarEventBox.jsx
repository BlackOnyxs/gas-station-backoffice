import React from 'react';

export const CalendarEventBox = ({ event }) => {
    const { dispenser, turn } = event;
    return (
      <>
        <strong>{ dispenser.name }</strong>
        <strong> - { turn.startTime } - { turn.endTime }</strong>
      </>
    )
}
