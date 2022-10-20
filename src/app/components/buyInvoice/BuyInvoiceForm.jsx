import React, { useEffect } from 'react';
import locale from 'antd/es/date-picker/locale/es_ES';
import { Form, Select, Input, DatePicker} from 'antd';

import { validProductType } from '../../../data/menus';
import { useBuyInvoiceStore, useInventoryStore, useProviderStore, useWorkersStore } from '../../../hooks';

export const BuyInvoiceForm = () => {
  const form = Form.useFormInstance();
  const { activeBuyInvoice } = useBuyInvoiceStore();
  const { startLoadProviders, providers, setActiveProvider} = useProviderStore();
  const { workers, startLoadingWorkers, setActiveWorker } = useWorkersStore();
  const { activeProductType, products, startLoadingProducts, activeProduct, setActiveProduct, setActiveProductType } = useInventoryStore();
  
 const onLoadProduct = () => {
    if ( !activeBuyInvoice ) {
      startLoadingProducts( activeProductType )
    }
 }
 
  useEffect( () => {
    onLoadProduct()
  }, [activeProductType]);

  useEffect(() => {
    startLoadProviders();
  },[])

  useEffect(() => {
    startLoadingWorkers();
  },[])

  const handleTypeChange = (value, option) => {
    setActiveProductType( option.value );
  }

  const handleTotal = ({ target }) => {
    if ( !activeProduct ) return
    let newTotal = Number(target.value) * Number(activeProduct.sellPrice);
    if ( !Number.isNaN( newTotal ) ) {
      form.setFieldsValue({ total: newTotal })
    }
    
  }

  const handleManager = ( manager ) => {
    workers.map( m => {
      if ( m.uid === manager ) {
        setActiveWorker( m )
      }
    })
  }

  const handleProductChange = ( value ) => {
       products.map( p => {
        if ( p._id === value ) {
         setActiveProduct( p );
        }
      });
  }

  const handleProviderChange = ( provider ) => {
    providers.map( p => {
      if ( p._id === provider ) {
        setActiveProvider( p );
      }
    })
  }

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
                <Select onChange={ handleProductChange }>
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
                label="Administrador"
                name="manager"
                key="manager"
              > 
                  {
                    workers && (
                      <Select onChange={ handleManager }>
                        {
                          workers.map( w => w.role === 'ADMIN_ROLE' && (
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
                <Input 
                  type="number" 
                  onChange={ handleTotal }
                  min={ 0 }  
                />
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
                <Input type="number" min={ 0 }/>
            </Form.Item>
                  <Form.Item
                  label="Proveedor"
                  name="provider"
                  key="provider"
              > 
                  {
                    providers && (
                      <Select onChange={ handleProviderChange }>
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
                <DatePicker locale={ locale } />
            </Form.Item>
            
  
            {/* Todo: add image file if activeproduct */}

        </>
    )
}
