import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'antd';

import { FuelForm } from './FuelForm';
import { useFuelStore, useUiStore } from '../../../hooks';
import { validFuel, validOctane } from '../../../data/menus';

export const AddFuelModal = () => {
    const [form] = Form.useForm();
    const { isModalOpen, closeModal } = useUiStore();
    const { startSavingFuel, startDeleteFuel, activeFuel } = useFuelStore();

    const handleOk = ({ name, type, sellPrice, octane, inventory }) => {
        startSavingFuel({ ...activeFuel, name, type, sellPrice, octane, inventory })
        closeModal();
    };

    const handleCancel = () => {
      closeModal();
    };

    const setInitialValues = () => {
      if ( activeFuel ) {
        console.log({ activeFuel })
        form.setFieldsValue({
          'name': activeFuel.name,
          'sellPrice': activeFuel.sellPrice,
          'type': activeFuel.type,
          'octane': activeFuel.octane,
          'inventory': activeFuel.inventory,
        })        
      } else {
        form.setFieldsValue({
          'name': '',
          'sellPrice': '',
          'type': validFuel[0].label,
          'octane': validOctane[0].label,
          'inventory': '',
        })          
      }
   }

    const handleDelete = () => {
      startDeleteFuel();
      closeModal();
    }

    useEffect(() => {
      setInitialValues();
    }, [activeFuel])
  

    return (
      <>
        <Modal 
            title={ activeFuel ? activeFuel.name : 'Nuevo Combustible' } 
            visible={isModalOpen} 
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
                  disabled={ !activeFuel }
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
            <FuelForm />
        </Form>
        </Modal>
      </>
    )
}
