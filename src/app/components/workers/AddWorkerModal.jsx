import React from 'react';
import { Modal, Button, Form, Input, Select, Switch } from 'antd';
import { validRoles } from '../../../data/menus';

// import { useCategoryStore, useInventoryStore, useUiStore } from '../../../hooks';

export const AddWorkerModal = () => {
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
            title="Nuevo Trabajador" //Todo: si existe el plato
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
                label="Cédula"
                name="CIP"
                key="CIP"
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
              label="Rol"
              name="role"
              key="role"
            >
              {
                validRoles && (
                  <Select
                    defaultValue={ validRoles[0].label }
                  >
                    {
                      validRoles.map( c => (
                        <Select.Option
                          key={ c._id }
                        >
                          { c.label }
                        </Select.Option>
                      ))
                    }
                  </Select>
                )
              }
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
