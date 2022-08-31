import React from 'react';
import { Form, Select } from 'antd';

import { validOctane, validFuel } from '../../../data/menus';

export const FuelFormConfig = () => {
  return (
    <>
        <Form.Item
            label="Tipo"
            name="type"
            key="type"
        > 
            {
              validFuel && (
                <Select
                  defaultValue={ validFuel[0].label }
                >
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
                <Select
                  defaultValue={ validOctane[0].label }
                >
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
    </>
  )
}
