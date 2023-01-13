import React from 'react';
import { Form, Input } from 'antd';

export const ClientForm = () => {
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
          <Input type="text"/>
      </Form.Item>
      <Form.Item
          label="Teléfono"
          name="phone"
          key="phone"
          rules={[
              {
                required: true,
                message: 'Campo reuqerido',
              },
            ]}
      >
          <Input type="tel"/>
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
          <Input type="email"/>
      </Form.Item>
      </>
    )
}   
