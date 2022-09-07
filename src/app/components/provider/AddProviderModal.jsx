import React from 'react';
import { Modal, Button, Form } from 'antd';
import { ProviderForm } from './ProviderForm';

import { useProviderStore, useUiStore } from '../../../hooks';
import { useEffect } from 'react';

export const AddProviderModal = () => {
  const [form] = Form.useForm();
    const { isProviderModalOpen , closeProviderModal } = useUiStore();
    const { startSavingProvider, startDeleteProvide, activeProvider, setActiveProvider } = useProviderStore();

    const handleOk = ({ name, phone }) => {
        startSavingProvider({...activeProvider, name, phone})
        closeProviderModal();
    };

    const handleCancel = () => {
      setActiveProvider(null);
      closeProviderModal();
    };

    const handleDelete = () => {
      startDeleteProvide()
      closeProviderModal();
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
            title={ activeProvider ? activeProvider.name : 'Nuevo Proveedor'}           // visible={isProviderModalOpen } 
            visible={ isProviderModalOpen } 
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
