import React from 'react';
import { Modal, Button, Form } from 'antd';
import { validRoles } from '../../../data/menus';

import { useWorkersStore,  useUiStore } from '../../../hooks';
import { WorkerForm } from './WorkerForm';

export const AddWorkerModal = () => {
  const [form] = Form.useForm();
    const { isWorkersModalOpen, closeWorkersModal } = useUiStore();
    const { startSavingWorker, activeWorker, startDeleteWorker, setActiveWorker} = useWorkersStore();

    const handleOk = ({ name, cip, phone, email, role, status, password}) => {
        if ( activeWorker.uid && status === true ) {
            startSavingWorker({ name, cip, phone, email, role, uid: activeWorker.uid, password, status })
        } else if ( status === false ) {
          startDeleteWorker( activeWorker );
        }else {
          startSavingWorker({ name, cip, phone, email, role, password});
        }
        closeWorkersModal();
    };

    const handleCancel = () => {
      setActiveWorker(null);
      closeWorkersModal();
    };

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
            initialValues={{
              name:  activeWorker ? activeWorker.name  : '',
              cip:   activeWorker ? activeWorker.cip   : '',
              email: activeWorker ? activeWorker.email : '',
              password: '',
              phone: activeWorker ? activeWorker.phone : '',
              status: activeWorker ?  activeWorker.status : true,
              role: activeWorker ?  activeWorker.role : validRoles[0].label
            }}
            
        >
            <WorkerForm />
        </Form>
        </Modal>
      </>
    )
}
