import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'antd';
import { ProviderForm } from './ProviderForm';

import { useProviderStore, useUiStore } from '../../../hooks';

export const AddProviderModal = () => {
  const [form] = Form.useForm();
    const { isModalOpen , closeModal } = useUiStore();
    const { startSavingProvider, startDeleteProvider, activeProvider, setActiveProvider } = useProviderStore();

    const handleOk = ({ name, phone }) => {
        startSavingProvider({...activeProvider, name, phone})
        closeModal();
    };

    const handleCancel = () => {
      setActiveProvider(null);
      closeModal();
    };

    const handleDelete = () => {
      startDeleteProvider()
      closeModal();
    }

    const setInitialValues = () => {
      if ( activeProvider ) {
        console.log('true')
        form.setFieldsValue({
          name: activeProvider.name,
          phone: activeProvider.phone
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
    },[ activeProvider ]);

    return (
      <>
        <Modal 
            title={ activeProvider ? activeProvider.name : 'Nuevo Proveedor'}  
            open={ isModalOpen } 
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
                  disabled={ !activeProvider }
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
          <ProviderForm />
        </Form>
        </Modal>
      </>
    )
}
