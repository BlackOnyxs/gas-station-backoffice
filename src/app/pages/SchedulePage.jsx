import React from 'react';
import { Row, Col, Calendar } from 'antd';
import { AddScheduleModal } from '../components/schedule/AddScheduleModal';

const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

const turns = [];
const dispensers = [];

export const SchedulePage = () => {
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
          <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
          </div>
        ) : null;
      };
    
      const dateCellRender = (value) => {
        return (
          <ul className="events">
            {turns.map((item) => ( //Change to scheduleData
              <li key={item.content}>
                <Badge status={item.type} text={item.content} />
              </li>
            ))}
          </ul>
        );
      };
      
    return (
        <>
          <Row>
            <Col span={ 24 } style={{ marginBottom: 15, paddingLeft: 20, paddingRight: 20 }}>
              <Calendar 
                onPanelChange={()=>{}}
                dateCellRender={ dateCellRender }
                monthCellRender={ monthCellRender }
                style={{
                    textAlign: 'center'
                }}
            />
            </Col>
          </Row>
            
          <AddScheduleModal />
        </>
      )
}
