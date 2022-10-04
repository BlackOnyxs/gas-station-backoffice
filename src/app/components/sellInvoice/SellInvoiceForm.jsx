import React, { useState, useEffect } from 'react';
import locale from 'antd/es/date-picker/locale/es_ES';
import { Form, Select, Input, DatePicker} from 'antd';

import { validProductType } from '../../../data/menus';
import { useBuyInvoiceStore, useClientStore, useWorkersStore } from '../../../hooks';

export const SellInvoiceForm = () => {
  const form = Form.useFormInstance();
  const { startLoadingProducts, products, activeBuyInvoice, activeProductType, setActiveProductType } = useBuyInvoiceStore();
  const { startLoadClients, clients } = useClientStore();
  const { startLoadingWorkers, workers } = useWorkersStore();

  // const [type, setType] = useState( (activeBuyInvoice) ? activeBuyInvoice.productType : activeProductType);
  
 const onLoadProduct = () => {
    if ( !activeBuyInvoice ) {
      startLoadingProducts( activeProductType )
    }
 }


  useEffect( () => {
    onLoadProduct()
  }, [activeProductType]);

  useEffect(() => {
    startLoadClients();
  },[]);

  useEffect(() => {
    startLoadingWorkers();
  },[]);

  const handleTypeChange = (value, option) => {
    setActiveProductType( option.value );
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
                    value={ activeProductType }
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
            label="Producto"
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
                label="Despachador"
                name="dispenser"
                key="dispenser"
              > 
                  {
                    workers && (
                      <Select 
                      // onChange={ handleProductChange }
                      >
                        {
                          workers.map( w => w.role === 'DISPENSER_ROLE' && (
                                <Select.Option
                                  key={ w.uid }
                                  value={ w.uid }
                                >
                                  { w.name }
                                </Select.Option>
                              ))             
                        }
                      </Select>
                    )
                  }
            </Form.Item>
            <Form.Item
                label="Cliente"
                name="client"
                key="client"
              > 
                  {
                    clients && (
                      <Select 
                      // onChange={ handleProductChange }
                      >
                        {
                          clients.map( p => (
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
