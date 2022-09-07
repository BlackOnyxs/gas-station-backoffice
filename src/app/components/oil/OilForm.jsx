import React from 'react';
import { Form, Input, Select } from 'antd';
import { validBranch, validOilType, validSize, validViscosity } from '../../../data/menus';


export const OilForm = () => {
    const form = Form.useFormInstance();
    return (
        <>
         <Form.Item
         label="Nombre"
         name="name"
         key="name"
         rules={[
             {
               required: true,
               message: 'Campo requerido',
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
              <Select>
                {
                  validBranch.map(b => (
                    <Select.Option
                      key={ b.name }
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
              <Select>
                {
                  validOilType.map( v => (
                    <Select.Option
                      key={ v.name }
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
              <Select>
                {
                  validViscosity.map( v => (
                    <Select.Option
                      key={ v.name }
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
              <Select>
                {
                  validSize.map( v => (
                    <Select.Option
                      key={ v.name }
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
            label="Precio"
            name="sellPrice"
            key="sellPrice"
            rules={[
                {
                  required: true,
                  message: 'Campo requerido',
                },
              ]}
        >
            <Input type="number"/>
        </Form.Item>
        <Form.Item
            label="Inventario"
            name="inventory"
            key="inventory"
            rules={[
                {
                  required: true,
                  message: 'Campo requerido',
                },
              ]}
        >
            <Input type="number"/>
        </Form.Item>
           

        {/* Todo: add image file if activeOil */}
        </>
    )
}
