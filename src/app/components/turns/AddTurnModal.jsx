import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'antd';
import moment from 'moment';

import { useUiStore } from '../../../hooks';
import { useTurnsStore } from '../../../hooks/useTurnsStore';
import { TurnFom } from './TurnFom';


export const AddTurnModal = () => {
    const [form] = Form.useForm();
    const { isTurnsModalOpen, closeTurnsModal } = useUiStore();
    const { startSavingTurn, activeTurn, startDeleteTurn } = useTurnsStore();

    const handleOk = ({ startTime, endTime, status }) => {
        if ( status ) {
          startSavingTurn({...activeTurn, startTime, endTime})
        }else {
          startDeleteTurn( activeTurn )
        }
        closeTurnsModal();
    };

    const handleCancel = () => {
      closeTurnsModal();
    };

    const format = 'HH:mm';
    
    const setInitialValues = () => {
      if ( activeTurn ) {
          form.setFieldsValue({
            startTime: moment(activeTurn.startTime, format),
            endTime: moment(activeTurn.endTime, format),
            status: activeTurn.status,
          });
      } else {
        form.setFieldsValue({
          startTime: '',
          endTime: '',
          status: '',
        });
      }
    }

    useEffect(() => {
      setInitialValues();
    }, [activeTurn])
    

    return (
      <>
        <Modal 
            title={ activeTurn ? `Turno ${ activeTurn.startTime } - ${ activeTurn.endTime}`: 'Nuevo Turno' } //Todo: si existe el plato
            visible={isTurnsModalOpen} 
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
           <TurnFom />
        </Form>
        </Modal>
      </>
    )
}
