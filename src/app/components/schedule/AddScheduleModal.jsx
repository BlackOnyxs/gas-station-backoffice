import React from 'react';
import { Modal, Button, Form } from 'antd';
import moment from 'moment';

import { useScheduleStore, useTurnsStore, useUiStore, useWorkersStore } from '../../../hooks';
import { useEffect } from 'react';
import { FormSchedule } from './FormSchedule';


export const AddScheduleModal = () => {
    const [form] = Form.useForm();
    const { isModalOpen, closeModal } = useUiStore();
    const { startSavingSchedule, activeSchedule, startDeleteSchedule, setActiveSchedule } = useScheduleStore();
    const { turns, activeTurn, setActiveTurn } = useTurnsStore();
    const { workers, activeWorker, setActiveWorker } = useWorkersStore();

    const handleOk = ({ date, total }) => {
        startSavingSchedule({
          ...activeSchedule, 
          dispenser: activeWorker.uid , 
          turn: activeTurn._id, 
          date: moment(date).format('DD-MM-yyyy'), 
          total,
          oldDispenser: activeSchedule?.dispenser.uid,
          oldTurn: activeSchedule?.turn._id,
          oldDate: moment(activeSchedule?.date).format('DD-MM-yyyy') ,
        })
        closeModal();
    };

    const handleCancel = () => {
      closeModal();
      setActiveSchedule( null );
      setActiveTurn(null);
      setActiveWorker(null);
    };

   const setInitialValues = () => {
      if ( activeSchedule ) {
        setActiveWorker( activeSchedule.dispenser );
        setActiveTurn( activeSchedule.turn );
        form.setFieldsValue({
          'dispenser': activeSchedule.dispenser.name,
          'total': activeSchedule.total,
          'turn': `${activeSchedule.turn.start} - ${activeSchedule.turn.end}`,
          'date': moment(activeSchedule.date, 'DD-MM-yyyy HH:mm:ss'),
        })        
      } else {
        setActiveTurn( turns[0] )
        setActiveWorker( workers[0] )
        form.setFieldsValue({
          'dispenser': workers[0],
          'total': 0,
          'turn': turns ? `${turns[0]?.startTime} - ${turns[0]?.endTime}` : '',
          'date': moment()
        })          
      }
   }

   useEffect(() => {
     setInitialValues();
   }, [activeSchedule, turns]);

   const handleDelete = () => {
      // startDeleteSchedule(activeSchedule);
      startDeleteSchedule({ dispenser: activeWorker.uid, turn: activeTurn._id, date: activeSchedule.date});
      closeModal();
   }
   

    return (
      <>
        <Modal 
            title={ activeSchedule ? activeSchedule._id : 'Nuevo Horario'}
            open={ isModalOpen } 
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={[
              <Button 
                  key="back" 
                  onClick={handleCancel}
              >
                Cerrar
              </Button>,
               <Button
                  danger
                  type='primary'
                  key="delete" 
                  onClick={ handleDelete }
                  disabled={ !activeSchedule }
              >
                Borrar
              </Button>,
              <Button
                  key="submit"
                  htmlType='submit'
                  form='category-form'
                  style={{ backgroundColor: '#74cc26', color: 'white' }}    
              >
                Guardar
              </Button>,
          ]}
        >
        <Form
            id="category-form"
            form={ form }
            labelCol={{ span: 8 }}
            layout="horizontal"
            wrapperCol={{
                span: 16,
            }}
            onFinish={ handleOk }
        >
          <FormSchedule />
        </Form>
        </Modal>
      </>
    )
}
