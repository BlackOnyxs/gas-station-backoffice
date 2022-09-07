import React from 'react';
import { Form, Input, Select } from 'antd';


import { validFuel, validOctane } from '../../../data/menus';

export const FuelForm = () => {
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
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
              label="Tipo"
              name="type"
              key="type"
            >
              {
                validFuel && (
                  <Select>
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
                  <Select>
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
                label="Precio"
                name="sellPrice"
                key="sellPrice"
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
        </>
    )
}
