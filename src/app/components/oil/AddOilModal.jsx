import React from 'react';
import { Modal, Button, Form } from 'antd';
import { useUiStore, useOilStore } from '../../../hooks';
import { OilForm } from './OilForm';
import { validBranch, validOilType, validSize, validViscosity } from '../../../data/menus';
import { useEffect } from 'react';

export const AddOilModal = () => {
    const [form] = Form.useForm();
    const { isModalOpen, closeModal } = useUiStore();
    const { startSavingOil, activeOil, setActiveOil, startDeleteOil } = useOilStore();

    const handleOk = ({ name, branch, type, viscosityGrade, size, inventory, price }) => { 
      startSavingOil({ ...activeOil, name, branch, type, viscosityGrade, size, inventory, price })
        closeModal();
    };

    const handleCancel = () => {
      setActiveOil(null);
      closeModal();
    };

    const handleDelete = () => {
      startDeleteOil();
      closeModal();
    }

    const setInitialValues = () => {
      if ( activeOil ) {
        form.setFieldsValue({
          'name': activeOil.name,
          'branch': activeOil.branch,
          'type': activeOil.type,
          'viscosityGrade': activeOil.viscosityGrade,
          'size': activeOil.size,
          'inventory': activeOil.inventory,
          'price': activeOil.price
        });
      }else{
        form.setFieldsValue({
          'name': '',
          'branch': validBranch[0].name,
          'type': validOilType[0].name,
          'viscosityGrade': validViscosity[0].name,
          'size': validSize[0].name,
          'inventory': '1',
          'price': '0.00',
        })
      }
    }

    useEffect(() => {
       setInitialValues();
    }, [ activeOil ])
    

    return (
      <>
        <Modal 
            title={ activeOil ? activeOil.name : 'Nuevo Aceite' }
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
                  disabled={ !activeOil }
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
           <OilForm />
        </Form>
        </Modal>
      </>
    )
}
