import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'antd';
import moment from 'moment';

import { useUiStore, useSellInvoiceStore, useInventoryStore, useClientStore, useWorkersStore } from '../../../hooks';
import { SellInvoiceForm } from './SellInvoiceForm';

export const AddInvoiceModal = () => {
    const [form] = Form.useForm();
    const { isModalOpen, closeModal } = useUiStore();
    const { setActiveClient, activeClient } = useClientStore();
    const { startSavingSellInvoice, activeSellInvoice, setActiveSellInvoice, startDeletingSellInvoice } = useSellInvoiceStore();
    const { activeProductType, products, setActiveProduct, activeProduct } = useInventoryStore();
    
    const { clients } = useClientStore();

    const handleOk = ({ dispenser, product, client, quantity, total, date }) => {
        startSavingSellInvoice({ 
          product: activeProduct?._id, 
          productType: activeProductType, 
          client: activeClient?._id, 
          quantity, 
          total,
          price: activeProduct?.sellPrice, 
          _id: activeSellInvoice?._id,
          date
        });
        closeModal();
        setActiveSellInvoice(null);
    };

    const handleDelete = () => {
      startDeletingSellInvoice(activeProductType[0]);
      closeModal();
    }

    const handleCancel = () => {
      closeModal();
      setActiveSellInvoice(null);
    };
    
    const setInitialValues = () => {
      if (activeSellInvoice) {
        setActiveClient(activeSellInvoice.client);
        setActiveProduct(activeSellInvoice.product);
        form.setFieldsValue({
          'productType': activeSellInvoice.product.productType,
          'product': activeSellInvoice.product.name,
          'quantity': activeSellInvoice.quantity,
          'total': activeSellInvoice.total,
          'dispenser': activeSellInvoice.dispenser.name,
          'client': activeSellInvoice.client.name,
          'date': moment(activeSellInvoice.date, 'DD-MM-yyyy HH:mm:ss')
        });
      } else {
        form.setFieldsValue({
          'productType': activeProductType,
          'product': '',
          'quantity': 1,
          'total': 0.00,
          'dispenser': '',
          'client': '',
          'date': moment()
        });
      }
    };
    

    useEffect(() => {
      setInitialValues();
    }, [products, clients, activeSellInvoice ])

    

    return (
      <>
        <Modal 
            title={ activeSellInvoice ? activeSellInvoice._id : 'Nueva Venta'}
            open={isModalOpen} 
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
                  style={{ backgroundColor: '#FFA500', color: 'white' }}    
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
