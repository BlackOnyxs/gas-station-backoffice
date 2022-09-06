import React from 'react';
import { Form, TimePicker, Switch } from 'antd';

export const TurnFom = () => {
    const form = Form.useFormInstance();
    const format = 'HH:mm';

    const handleStatusChange = () => {}


    return (
        <>
             <Form.Item
                label="Hora Inicio"
                name="startTime"
                key="startTime"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
                <TimePicker 
                  format={format} 
                />
            </Form.Item>
            <Form.Item
                label="Hora Fin"
                name="endTime"
                key="endTime"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
                 <TimePicker 
                  format={format} 
                />
            </Form.Item>
  
           
        </>
    )
}
