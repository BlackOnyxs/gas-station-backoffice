import React, { useState, useEffect } from 'react';
import locale from 'antd/es/date-picker/locale/es_ES';
import { Form, Select, Input, DatePicker} from 'antd';

import { validProductType } from '../../../data/menus';
import { useBuyInvoiceStore, useProviderStore } from '../../../hooks';

export const BuyInvoiceForm = () => {
  const form = Form.useFormInstance();
  const { startLoadingProducts, products, activeBuyInvoice } = useBuyInvoiceStore();
  const { startLoadProviders, providers } = useProviderStore();

  const [type, setType] = useState( (activeBuyInvoice) ? 
  { 
      _id: 1,
      name: activeBuyInvoice.productType,
      key: productType
    
  } : validProductType[0]);
  
 const onLoadProduct = () => {
    if ( !activeBuyInvoice ) {
      startLoadingProducts( type.key )
    }
 }


  useEffect( () => {
    onLoadProduct()
  }, [type]);

  useEffect(() => {
    startLoadProviders();
  },[])

  const handleTypeChange = (value, option) => {
    setType( validProductType[option.key-1])
  }

  // const handleProductChange = (value) => {
  //   const currentProduct = products.map( p => p._id === value );
  //   form.setFields({ total: currentProduct * form.getFieldValue('cantidad')})
  // }

  const handleDateChange = () => {}

  return (
        <>
        <Form.Item
            label="Tipo de Producto"
            name="productType"
            key="productType"
            >
              {
                validProductType && (
                  <Select 
                    value={ type }
                    onChange={ handleTypeChange }>
                    {
                      validProductType.map( b => (
                        <Select.Option
                          key={ b._id }
                          value={ b.key }
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
            label={ type.name }
            name="product"
            key="product"
        > 
            {
              products && (
                <Select 
                // onChange={ handleProductChange }
                >
                  {
                    products.map( f => (
                      <Select.Option
                        key={ f._id }
                        value={ f._id }
                      >
                        { f.name }
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
        </Form.Item>
            <Form.Item
                label="Cantidad"
                name="quantity"
                key="quantity"
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
                label="Monto Total"
                name="total"
                key="total"
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
                  label="Proveedor"
                  name="provider"
                  key="provider"
              > 
                  {
                    providers && (
                      <Select 
                      // onChange={ handleProductChange }
                      >
                        {
                          providers.map( p => (
                            <Select.Option
                              key={ p._id }
                              value={ p._id }
                            >
                              { p.name }
                            </Select.Option>
                          ))
                        }
                      </Select>
                    )
                  }
              </Form.Item>
            <Form.Item
                label="Fecha"
                name="date"
                key="date"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
                <DatePicker  locale={ locale } onChange={handleDateChange} />
            </Form.Item>
            
  
            {/* Todo: add image file if activeproduct */}

        </>
    )
}
