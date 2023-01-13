import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { validRoles } from '../../../data/menus';

export const WorkerForm = () => {
    const form = Form.useFormInstance();
    const [role, setRole] = useState('');

    // useEffect(() => {
    // }, [role])
    

    const handleRole = ( value ) => {
      setRole(value)
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
                  message: 'Campo requerido',
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
                  message: 'Campo requerido',
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
                  message: 'Campo requerido',
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
            //       message: 'Campo requerido',
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
                  message: 'Campo requerido',
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
            <Select
              onChange={ handleRole }
            >
              {
                validRoles.map( c => (
                  <Select.Option
                    key={ c.value }
                    value={ c.value }
                  >
                    { c.label }
                  </Select.Option>
                ))
            }
            
            </Select>
        </Form.Item>
        {
          (role === 'DISPENSER_ROLE') && (
            <Form.Item
              label="Salario"
              name="salary"
              key="salary"
              rules={[
                  {
                    required: true,
                    message: 'Campo requerido',
                  },
              ]}
            >
                <Input  type="number" min={0} />
            </Form.Item>
        )
        }
        </>
  )
}
