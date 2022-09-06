import React,  { useEffect } from 'react';
import { Modal, Button, Form } from 'antd';

import { useWorkersStore,  useUiStore } from '../../../hooks';
import { WorkerForm } from './WorkerForm';

export const AddWorkerModal = () => {
  const [form] = Form.useForm();
    const { isWorkersModalOpen, closeWorkersModal } = useUiStore();
    const { startSavingWorker, activeWorker, startDeleteWorker, setActiveWorker} = useWorkersStore();

    const handleOk = ({ name, cip, phone, email, role, password}) => {
      startSavingWorker({...activeWorker, name, cip, phone, email, password, role});   
      closeWorkersModal();
    };

    const handleCancel = () => {
      setActiveWorker(null);
      closeWorkersModal();
    };

    const setInitialValues = () => {
      if ( activeWorker !== null ) {
          form.setFieldsValue({
            name:  activeWorker.name,
            cip:   activeWorker.cip,
            email: activeWorker.email,
            password: '',
            phone: activeWorker.phone,
            status: activeWorker.status,
            role: activeWorker.role,
          })
      }else {
        form.setFieldsValue({
          name: '',
          cip: '',
          email: '',
          password: '',
          phone: '',
          status: '',
          role: '',
        })
      }
    }

    useEffect(() => {
      setInitialValues();
    }, [activeWorker])
    
    const handleDelete = () => {
      startDeleteWorker(activeWorker);
      closeWorkersModal();
    }


    return (
      <>
        <Modal 
            title={ (activeWorker) ? activeWorker.name : 'Nuevo Colaborador'} //Todo: si existe el plato
            visible={isWorkersModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            destroyOnClose={ true }
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
                  disabled={ !activeWorker }
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
            form={form}
            id="category-form"
            labelCol={{ span: 8 }}
            layout="horizontal"
            wrapperCol={{
                span: 16,
            }}
            onFinish={ handleOk }
        >
            <WorkerForm />
        </Form>
        </Modal>
      </>
    )
}
