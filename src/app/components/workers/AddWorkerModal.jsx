import React from 'react';
import { Modal, Button, Form } from 'antd';
import { validRoles } from '../../../data/menus';

import { useWorkersStore,  useUiStore } from '../../../hooks';
import { WorkerForm } from './WorkerForm';

export const AddWorkerModal = () => {
  const [form] = Form.useForm();
    const { isWorkersModalOpen, closeWorkersModal } = useUiStore();
    const { startSavingWorker, activeWorker, setActiveWorker} = useWorkersStore();

    const handleOk = ({ name, cip, phone, email, role, status, password}) => {
        if ( activeWorker ) {
            startSavingWorker({ name, cip, phone, email, role, _id: activeWorker._id, password, status })
        } else {
          startSavingWorker({ name, cip, phone, email, role, password});
        }
        closeWorkersModal();
    };

    const handleCancel = () => {
      setActiveWorker(null);
      // form.setFieldsValue({
      //   name: '',
      //   cip: '',
      //   email: '',
      //   password: '',
      //   phone: '',
      //   status: '',
      //   role: '',
      // })
      // form.resetFields(['name'])
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
