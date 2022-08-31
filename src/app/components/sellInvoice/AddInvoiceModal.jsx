import React from 'react';
import { Modal, Button, Form, Input, Select, Switch, DatePicker } from 'antd';
import { validProductType } from '../../../data/menus';
import { FuelFormConfig } from './FuelFormConfig';
import { OilFormConfig } from './OilFormConfig';

// import { useCategoryStore, useInventoryStore, useUiStore } from '../../../hooks';

const activeProduct = {
  _id: '123',
  tipo: 'Oil'
}

export const AddInvoiceModal = () => {
    // const { isProductModalOpen, closeProductModal } = useUiStore();
    // const { categories } = useCategoryStore();
    // const { startSavingProducts, activeProduct } = useInventoryStore();

    const handleOk = ({ name, category, price, description }) => {
        // if ( activeProduct ) {
        //     startSavingProducts({ name, category, price, description, _id: activeProduct._id })
        // } else {
        //   startSavingProducts({ name, category, price, description })
        // }
        // closeProductModal();
    };

    const handleCancel = () => {
      // closeProductModal();
    };

    const handleDateChange = () => {

    }

    return (
      <>
        <Modal 
            title="Nueva Venta" //Todo: si existe el plato
            // visible={isProductModalOpen} 
            // visible={true} 
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
        >
            <Form.Item
              label="Producto"
              name="product"
              key="product"
            >
              {
                validProductType && (
                  <Select
                    defaultValue={ validProductType[0].name }
                  >
                    {
                      validProductType.map( b => (
                        <Select.Option
                          key={ b._id }
                        >
                          { b.name }
                        </Select.Option>
                      ))
                    }
                  </Select>
                )
              }
            </Form.Item>
            {
              (activeProduct.tipo === 'Combustible')
                ? <FuelFormConfig /> 
                : <OilFormConfig />
            }
            <Form.Item
                label="Cantidad"
                name="quantity"
                key="quantity"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
                <Input type="number"/>
            </Form.Item>
            <Form.Item
                label="Monto Total"
                name="total"
                key="total"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
                <Input type="number"/>
            </Form.Item>
            <Form.Item
                label="Fecha"
                name="date"
                key="date"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
                <DatePicker onChange={handleDateChange} />
            </Form.Item>
            
  
            {/* Todo: add image file if activeproduct */}
            <Form.Item
                label="Estado"
                name="status"
                key="status"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
                <Switch checked onChange={()=> {}}/>
            </Form.Item>
        </Form>
        </Modal>
      </>
    )
}
