import React from 'react';
import { Modal, Button, Form, Input, Select, Switch } from 'antd';
import { validFuel, validOctane, validRoles } from '../../../data/menus';

// import { useCategoryStore, useInventoryStore, useUiStore } from '../../../hooks';

export const AddFuelModal = () => {
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

    return (
      <>
        <Modal 
            title="Nuevo Combustible" //Todo: si existe el plato
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
                label="Nombre"
                name="name"
                key="name"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
                <Input type="text"/>
            </Form.Item>
            <Form.Item
              label="Tipo"
              name="type"
              key="type"
            >
              {
                validFuel && (
                  <Select
                    defaultValue={ validFuel[0].label }
                  >
                    {
                      validFuel.map( f => (
                        <Select.Option
                          key={ f._id }
                        >
                          { f.label }
                        </Select.Option>
                      ))
                    }
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item
              label="Octanage"
              name="octane"
              key="octane"
            >
              {
                validOctane && (
                  <Select
                    defaultValue={ validOctane[0].label }
                  >
                    {
                      validOctane.map( o => (
                        <Select.Option
                          key={ o._id }
                        >
                          { o.label }
                        </Select.Option>
                      ))
                    }
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item
                label="Inventario"
                name="inventory"
                key="inventory"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
                <Input type="number"/>
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
