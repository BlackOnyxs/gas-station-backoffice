import React from 'react';
import { Modal, Button, Form, Input, Select, Switch } from 'antd';
import { validBranch, validFuel, validOctane, validOilType, validRoles, validSize, validViscosity } from '../../../data/menus';

// import { useCategoryStore, useInventoryStore, useUiStore } from '../../../hooks';

export const AddOilModal = () => {
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
            title="Nuevo Aceite" //Todo: si existe el plato
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
              label="Marca"
              name="branch"
              key="branch"
            >
              {
                validBranch && (
                  <Select
                    defaultValue={ validBranch[0].name }
                  >
                    {
                      validBranch.map(b => (
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
            <Form.Item
              label="Tipo"
              name="type"
              key="type"
            >
              {
                validOilType && (
                  <Select
                    defaultValue={ validOilType[0].name }
                  >
                    {
                      validOilType.map( v => (
                        <Select.Option
                          key={ v._id }
                        >
                          { v.name }
                        </Select.Option>
                      ))
                    }
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item
              label="Viscosidad"
              name="viscosityGrade"
              key="viscosityGrade"
            >
              {
                validViscosity && (
                  <Select
                    defaultValue={ validViscosity[0].name }
                  >
                    {
                      validViscosity.map( v => (
                        <Select.Option
                          key={ v._id }
                        >
                          { v.name }
                        </Select.Option>
                      ))
                    }
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item
              label="Unidad"
              name="size"
              key="size"
            >
              {
                validSize && (
                  <Select
                    defaultValue={ validSize[0].name }
                  >
                    {
                      validSize.map( v => (
                        <Select.Option
                          key={ v._id }
                        >
                          { v.name }
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
