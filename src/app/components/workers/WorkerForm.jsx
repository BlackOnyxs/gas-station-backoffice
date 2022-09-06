import React from 'react';
import { Form, Input, Select, Switch } from 'antd';
import { validRoles } from '../../../data/menus';

export const WorkerForm = () => {
    const form = Form.useFormInstance();

    const handleCheked = () => {
      
    }
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
            <Input type="text"/>
        </Form.Item>
        <Form.Item
            label="Cédula"
            name="cip"
            key="cip"
            rules={[
                {
                  required: true,
                  message: 'Campo reuqerido',
                },
              ]}
        >
            <Input type="text"  />
        </Form.Item>
        <Form.Item
            label="Correo"
            name="email"
            key="email"
            rules={[
                {
                  required: true,
                  message: 'Campo reuqerido',
                },
              ]}
        >
            <Input  type="text" />
        </Form.Item>
        <Form.Item
            label="Contraseña"
            name="password"
            key="password"
            // rules={[
            //     {
            //       required: A,
            //       message: 'Campo reuqerido',
            //     },
            //   ]}
        >
            <Input type="text" />
        </Form.Item>
        <Form.Item
            label="Telefono"
            name="phone"
            key="phone"
            rules={[
                {
                  required: true,
                  message: 'Campo reuqerido',
                },
              ]}
        >
            <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Rol"
          name="role"
          key="role"
        >
            <Select>
              {
                validRoles.map( c => (
                  <Select.Option
                    key={ c.value }
                  >
                    { c.label }
                  </Select.Option>
                ))
            }
            </Select>
        </Form.Item>
        </>
  )
}
