import React from 'react';
import { Modal, Button, Form } from 'antd';


import { useUiStore, useSellInvoiceStore } from '../../../hooks';
import { SellInvoiceForm } from './SellInvoiceForm';

export const AddInvoiceModal = () => {
    const [form] = Form.useForm();
    const { isModalOpen, closeModal } = useUiStore();
    const { startSavingSellInvoice, startLoadingSellInvoices, activeSellInvoice } = useSellInvoiceStore();

    const handleOk = ({ dispenser, product, productType, client, quantity, total }) => {
      console.log({ dispenser, product, productType, client, quantity, total })
        startSavingSellInvoice({ dispenser, product, productType, client, quantity, total, _id: activeSellInvoice?._id });
        closeModal();
    };

    const handleCancel = () => {
      closeModal();
    };

    const handleDelete = () => {
      startLoadingSellInvoices();
    }

    return (
      <>
        <Modal 
            title="Nueva Venta" //Todo: si existe el plato
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
                  disabled={ !activeSellInvoice }
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
           <SellInvoiceForm />
        </Form>
        </Modal>
      </>
    )
}
