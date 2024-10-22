import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'antd';
import moment from 'moment';

import { useUiStore } from '../../../hooks';
import { useTurnsStore } from '../../../hooks/useTurnsStore';
import { TurnFom } from './TurnFom';


export const AddTurnModal = () => {
    const [form] = Form.useForm();
    const { isModalOpen, closeModal } = useUiStore();
    const { startSavingTurn, activeTurn, startDeleteTurn } = useTurnsStore();

    const handleOk = ({ startTime, endTime, status }) => {
        startSavingTurn({...activeTurn, startTime, endTime});
        closeModal();
    };

    const handleCancel = () => {
      closeModal();
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
    
    const handleDelete = () => {
      startDeleteTurn(activeTurn);
      closeModal();
    }

    return (
      <>
        <Modal 
            title={ activeTurn ? `Turno ${ activeTurn.startTime } - ${ activeTurn.endTime}`: 'Nuevo Turno' } //Todo: si existe el plato
            open={isModalOpen} 
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
                  disabled={ !activeTurn }
              >
                Borrar
              </Button>,
              <Button
                  key="submit"
                  htmlType='submit'
                  form='category-form'
                  style={{ backgroundColor: '#FFA500', color: 'white' }}    
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
