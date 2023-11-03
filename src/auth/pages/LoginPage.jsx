import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Space, Image } from 'antd';
import Swal from 'sweetalert2';

import { useAuthStore } from '../../hooks';

export const LoginPage = () => {

  const { starLogin, errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage])


  const onFinish = ({ email, password }) => {
    starLogin({ email, password });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Space
      direction="vertical"
      align="center"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%'}}
    >
      <Image
        width={300}
        src='/src/assets/banner.png'
        preview={ false }
      />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,

          }}
        >
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#FFA500', borderColor: 'transparent', width: '100%'}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};