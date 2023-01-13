import React, { useEffect } from 'react';
import locale from 'antd/es/date-picker/locale/es_ES';
import { Form, Select, Input, DatePicker} from 'antd';

import { validProductType, validRoles } from '../../../data/menus';
import { useClientStore, useInventoryStore, useSellInvoiceStore, useWorkersStore } from '../../../hooks';

export const SellInvoiceForm = () => {
  const form = Form.useFormInstance();
  const { activeBuyInvoice } = useSellInvoiceStore();
  const { activeProductType, startLoadingProducts, setActiveProductType, activeProduct, setActiveProduct, products } = useInventoryStore();
  const { startLoadClients, clients, setActiveClient } = useClientStore();
  const { startLoadingWorkers, workers, setActiveWorker } = useWorkersStore();

  
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
    startLoadingWorkers(validRoles[1].value);
  },[]);

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

  const handleProductChange = ( value ) => {
    products.map( p => {
     if ( p._id === value ) {
      setActiveProduct( p );
     }
   });
  } 

   const handleDispenserChange = ( value ) => {
    workers.map( w => {
      if ( w.uid === value ) {
       setActiveWorker( w );
      }
    });
  }

   const handleClientChange = ( value ) => {
    clients.map( c => {
      if ( c._id === value ) {
        setActiveClient( c );
      }
    });
  }

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
                <Input  min={ 0 }/>
            </Form.Item>
            <Form.Item
                label="Despachador"
                name="dispenser"
                key="dispenser"
              > 
                  {
                    workers && (
                      <Select onChange={ handleDispenserChange }>
                        {
                          workers.map( w  => (
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
                      <Select onChange={handleClientChange}>
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
                <DatePicker locale={ locale } onChange={handleDateChange} />
            </Form.Item>
            
  
            {/* Todo: add image file if activeproduct */}

        </>
    )
}
