import React from 'react';
import { Form, Select } from 'antd';
import { validOilType, validSize, validViscosity } from '../../../data/menus';
import { useOilStore } from '../../../hooks';


export const OilFormConfig = () => {
  const { oils } = useOilStore();

  return (
     <>
        <Form.Item
            label="Aceite"
            name="porductType"
            key="porductType"
        > 
            {
              oils && (
                <Select >
                  {
                    oils.map( t => (
                      <Select.Option
                        key={ t._id }
                      >
                        { t.name }
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
        </Form.Item>
        
    </>
  )
}
