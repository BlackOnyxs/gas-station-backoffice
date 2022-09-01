import React from 'react';
import moment from 'moment';
import { Modal, Button, Form, TimePicker, Switch } from 'antd';

import { useUiStore } from '../../../hooks';
import { useTurnsStore } from '../../../hooks/useTurnsStore';

export const AddTurnModal = () => {
    const { isTurnsModalOpen, closeTurnsModal } = useUiStore();
    const { startSavingTurn, activeTurn, startDeleteTurn } = useTurnsStore();

    const handleOk = ({ startTime, endTime, status }) => {
        if ( activeTurn._id && status === true ) {
            startSavingTurn({ startTime, endTime, _id: activeTurn._id })
        } else if ( activeTurn._id && status === false ) {
          startDeleteTurn(activeTurn);
        } else {
          startSavingTurn({ startTime, endTime })
        }
        closeTurnsModal();
    };

    const handleCancel = () => {
      closeTurnsModal();
    };

    const handleStatusChange = () => {

    }

    const format = 'HH:mm:ss';

    return (
      <>
        <Modal 
            title={ activeTurn ? `Turno ${ activeTurn.startTime } - ${ activeTurn.endTime}`: 'Nuevo Turno' } //Todo: si existe el plato
            visible={isTurnsModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            destroyOnClose
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
            labelCol={{ span: 8 }}
            layout="horizontal"
            wrapperCol={{
                span: 16,
            }}
            onFinish={ handleOk }
            initialValues={{
              startTime: activeTurn ? moment(activeTurn.startTime, format) : moment('12:08', format),
              endTime: activeTurn ? moment(activeTurn.endTime, format) : moment('12:08', format),
              status: activeTurn ?  activeTurn.status : true,
            }}
        >
            <Form.Item
                label="Hora Inicio"
                name="startTime"
                key="startTime"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
                <TimePicker 
                  format={format} 
                />
            </Form.Item>
            <Form.Item
                label="Hora Fin"
                name="endTime"
                key="endTime"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
                 <TimePicker 
                  format={format} 
                />
            </Form.Item>
  
            {/* Todo: add image file if activeproduct */}
            <Form.Item
                label="Estado"
                name="status"
                key="status"
            >
                <Switch defaultChecked onChange={ handleStatusChange }/>
            </Form.Item>
        </Form>
        </Modal>
      </>
    )
}
