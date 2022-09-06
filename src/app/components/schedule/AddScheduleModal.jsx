import React from 'react';
import { Modal, Button, Form } from 'antd';
import moment from 'moment';

import { useScheduleStore, useTurnsStore, useUiStore, useWorkersStore } from '../../../hooks';
import { useEffect } from 'react';
import { FormSchedule } from './FormSchedule';


export const AddScheduleModal = () => {
    const [form] = Form.useForm();
    const { isScheduleModalOpen, closeScheduleModal } = useUiStore();
    const { startSavingSchedule, activeSchedule, startDeleteSchedule } = useScheduleStore();
    const { turns } = useTurnsStore();
    const { workers } = useWorkersStore();

    const handleOk = ({ dispenser, turn, date, status }) => {
      console.log(status)
        if ( status ) {
          startSavingSchedule({...activeSchedule, dispenser, turn, date, status })
        } else {
          startDeleteSchedule( activeSchedule );
        }
        closeScheduleModal();
    };

    const handleCancel = () => {
      closeScheduleModal();
    };

   const setInitialValues = () => {
      if ( activeSchedule ) {
        form.setFieldsValue({
          'dispenser': activeSchedule.dispenser.name,
          'turn': activeSchedule.turn,
          'date': moment(activeSchedule.date, 'YYYY/MM/DD'),
        })        
      } else {
        form.setFieldsValue({
          'dispenser': workers,
          'turn': turns,
          'date': moment()
        })          
      }
   }

   useEffect(() => {
     setInitialValues();
   }, [activeSchedule]);

   const handleDelete = () => {
      startDeleteSchedule(activeSchedule);
      closeScheduleModal();
   }
   

    return (
      <>
        <Modal 
            title="Nuevo Horario" //Todo: si existe el plato
            visible={ isScheduleModalOpen } 
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
