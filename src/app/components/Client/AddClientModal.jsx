import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'antd';
import { ClientForm } from './ClientForm';

import { useClientStore, useUiStore } from '../../../hooks';

export const AddClientModal = () => {
  const [form] = Form.useForm();
    const { isModalOpen , closeModal } = useUiStore();
    const { startSavingClient, startDeleteClient, activeClient, setActiveClient } = useClientStore();

    const handleOk = ({ name, phone }) => {
        startSavingClient({...activeClient, name, phone})
        closeModal();
    };

    const handleCancel = () => {
      setActiveClient(null);
      closeModal();
    };

    const handleDelete = () => {
      startDeleteClient()
      closeModal();
    }

    const setInitialValues = () => {
      if ( activeClient ) {
        console.log('true')
        form.setFieldsValue({
          name: activeClient.name,
          phone: activeClient.phone
        });
      } else {
        console.log('false')
        form.setFieldsValue({
          name: '',
          phone: ''
        })
      }
    }

    useEffect(() => {
      setInitialValues();
    },[ activeClient ]);

    return (
      <>
        <Modal 
            title={ activeClient ? activeClient.name : 'Nuevo Client'}  
            visible={ isModalOpen } 
            onOk={ handleOk } 
            onCancel={ handleCancel }
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
                  disabled={ !activeClient }
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
          <ClientForm />
        </Form>
        </Modal>
      </>
    )
}
