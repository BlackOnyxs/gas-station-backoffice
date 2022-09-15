import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'antd';
import moment from 'moment';

import { BuyInvoiceForm } from './BuyInvoiceForm';
import { useBuyInvoiceStore, useProviderStore, useUiStore } from '../../../hooks';
import { validProductType } from '../../../data/menus';


export const AddInvoiceModal = () => {
    const [form] = Form.useForm();
    const { isModalOpen, closeModal } = useUiStore();
    const { startSavingBuyInvoice, activeBuyInvoice, startDeleteBuyInvoice, products } = useBuyInvoiceStore();
    const { providers } = useProviderStore();

    const handleOk = ({ product, productType, quantity, total, provider, date }) => {
      console.log(productType)
      startSavingBuyInvoice({ product, productType, quantity, total, provider, date })
      closeModal();
    };

  const handleCancel = () => {
      closeModal();
    };

  const handleDelete = () => {
    startDeleteBuyInvoice();
  }

  const setInitialValues = () => {
    if ( activeBuyInvoice ) {
      form.setFieldsValue({
        'productType': activeBuyInvoice.productType,
        'product': activeBuyInvoice.product.name,
        'quantity': activeBuyInvoice.quantity,
        'total': activeBuyInvoice.total,
        'Provider': activeBuyInvoice.provider.name,
        'date': moment(activeBuyInvoice.createdAt, 'YYYY/MM/DD')
      })
    }else{
      form.setFieldsValue({
        'productType': validProductType[0].key,
        'product': '',
        // 'product': products ? products[0].name : '',
        'quantity': 1,
        'total': '',
        // 'Provider': providers ? providers[0].name : '',
        'Provider': '',
        'date': moment()
      });
    }
  }

  useEffect(() => {
    setInitialValues();
  }, [products, providers])

    return (
      <>
        <Modal 
            title={ activeBuyInvoice ? activeBuyInvoice._id : 'Nueva Venta'}
            visible={ isModalOpen } 
            onOk={ handleOk } 
            onCancel={ handleCancel }
            footer={[
              <Button 
                  key="back" 
                  onClick={ handleCancel }
              >
                Cerrar
              </Button>,
              <Button
                  danger
                  type='primary'
                  key="delete" 
                  onClick={ handleDelete }
                  disabled={ !activeBuyInvoice }
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
            labelCol={{ span: 8 }}
            layout="horizontal"
            wrapperCol={{
                span: 16,
            }}
            onFinish={ handleOk }
            form={ form }
        >
            <BuyInvoiceForm />
        </Form>
        </Modal>
      </>
    )
}
