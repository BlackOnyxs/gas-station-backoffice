import React from 'react';
import { Form, Select } from 'antd';
import { validOilType, validSize, validViscosity } from '../../../data/menus';


export const OilFormConfig = () => {
  return (
     <>
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
                    validOilType.map( t => (
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
                    validViscosity.map( o => (
                      <Select.Option
                        key={ o._id }
                      >
                        { o.name }
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
                    validSize.map( s => (
                      <Select.Option
                        key={ s._id }
                      >
                        { s.name }
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
