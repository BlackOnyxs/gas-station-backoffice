import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'antd';
import moment from 'moment';

import { BuyInvoiceForm } from './BuyInvoiceForm';
import { useBuyInvoiceStore, useInventoryStore, useProviderStore, useUiStore, useWorkersStore } from '../../../hooks';


export const AddInvoiceModal = () => {
    const [form] = Form.useForm();
    const { isModalOpen, closeModal } = useUiStore();
    const { startSavingBuyInvoice, activeBuyInvoice, startDeleteBuyInvoice, setActiveBuyInvoice } = useBuyInvoiceStore();
    const { providers, setActiveProvider, activeProvider } = useProviderStore();
    const { activeProductType, setActiveProduct, activeProduct, products } = useInventoryStore();
    const { setActiveWorker, activeWorker } = useWorkersStore();

    const handleOk = ({ quantity, total, date }) => {
      
      startSavingBuyInvoice({ 
        _id: activeBuyInvoice?._id ,
        product: activeProduct._id, 
        productType: activeProductType, 
        manager: activeWorker._id,
        quantity, 
        price: activeProduct.sellPrice,
        total, 
        provider: activeProvider._id, 
        date 
      })
      closeModal();
      setActiveBuyInvoice(null)
    };

  const handleCancel = () => {
      closeModal();
      setActiveBuyInvoice(null)
  };

  // const handleACtive = () => {
  //   const activeP = products.find( p => p.)
  // }

  const handleDelete = () => {
    startDeleteBuyInvoice(activeProductType[0]);
    closeModal();
    // setActiveBuyInvoice(null)
  }

  const setInitialValues = () => {
    if ( activeBuyInvoice ) {
      console.log({'active':activeBuyInvoice.product})
      setActiveProvider( activeBuyInvoice.provider );
      setActiveProduct( activeBuyInvoice.product );
      setActiveWorker( activeBuyInvoice.updatedBy );
      form.setFieldsValue({
        'productType': activeBuyInvoice.product.productType,
        'product': activeBuyInvoice.product.name,
        'quantity': activeBuyInvoice.quantity,
        'price': activeBuyInvoice.product.sellPrice,
        'total': activeBuyInvoice.total,
        'manager': activeBuyInvoice.updatedBy.name,
        'provider': activeBuyInvoice.provider.name,
        'date': moment(activeBuyInvoice.date, 'YYYY/MM/DD')
      })
    }else{
      console.log('nop')
      form.setFieldsValue({
        'productType': activeProductType,
        'product': '',
        // 'product': products ? products[0].name : '',
        'quantity': 1,
        'total': 0.00,
        // 'Provider': providers ? providers[0].name : '',
        'provider': '',
        'date': moment()
      });
    }
  }

  useEffect(() => {
    setInitialValues();
  }, [activeBuyInvoice])

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
                  form='buy-form'
                  style={{ backgroundColor: '#74cc26', color: 'white' }}    
              >
                Guardar
              </Button>,
          ]}
        >
        <Form
            id="buy-form"
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
