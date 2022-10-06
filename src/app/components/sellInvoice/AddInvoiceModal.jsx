import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'antd';
import moment from 'moment';

import { useUiStore, useSellInvoiceStore, useInventoryStore, useClientStore } from '../../../hooks';
import { SellInvoiceForm } from './SellInvoiceForm';

export const AddInvoiceModal = () => {
    const [form] = Form.useForm();
    const { isModalOpen, closeModal } = useUiStore();
    const { startSavingSellInvoice, startLoadingSellInvoices, activeSellInvoice } = useSellInvoiceStore();
    const { activeProductType, products } = useInventoryStore();
    const { clients } = useClientStore();

    const handleOk = ({ dispenser, product, client, quantity, total }) => {
        startSavingSellInvoice({ dispenser, product, productType: activeProductType, client, quantity, total, _id: activeSellInvoice?._id });
        closeModal();
    };

    const handleCancel = () => {
      closeModal();
    };

    const handleDelete = () => {
      startLoadingSellInvoices();
    }

    const setInitialValues = () => {
      if ( activeSellInvoice ) {
        form.setFieldsValue({
          'productType': activeSellInvoice.productType,
          'product': activeSellInvoice.product.name,
          'quantity': activeSellInvoice.quantity,
          'total': activeSellInvoice.total,
          'dispenser': activeSellInvoice.dispenser.name,
          'client': activeSellInvoice.client.name,
          'date': moment(activeSellInvoice.createdAt, 'YYYY/MM/DD')
        })
      }else{
        form.setFieldsValue({
          'productType': activeProductType,
          'product': '',
          // 'product': products ? products[0].name : '',
          'quantity': 1,
          'total': 0.00,
          // 'Provider': providers ? providers[0].name : '',
          'dispenser': '',
          'client': '',
          'date': moment()
        });
      }
    }

    useEffect(() => {
      setInitialValues();
    }, [products, clients ])

    return (
      <>
        <Modal 
            title={ activeSellInvoice ? activeSellInvoice._id : 'Nueva Venta'}
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
