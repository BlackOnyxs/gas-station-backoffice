import React from 'react';
import { Modal, Button, Form, Switch, Tag, Select, DatePicker } from 'antd';

// import { useCategoryStore, useInventoryStore, useUiStore } from '../../../hooks';
const turns = [{ _id: '1', startTime: '01:00', endTime: '08:00'}];
const dispensers = [];
export const AddScheduleModal = () => {
    // const { isProductModalOpen, closeProductModal } = useUiStore();
    // const { categories } = useCategoryStore();
    // const { startSavingProducts, activeProduct } = useInventoryStore();

    const handleOk = ({ name, category, price, description }) => {
        // if ( activeProduct ) {
        //     startSavingProducts({ name, category, price, description, _id: activeProduct._id })
        // } else {
        //   startSavingProducts({ name, category, price, description })
        // }
        // closeProductModal();
    };

    const handleCancel = () => {
      // closeProductModal();
    };

    const handleDateChange = (date)=> {
      // ActiveDate TODO:
    }

   

    return (
      <>
        <Modal 
            title="Nuevo Horario" //Todo: si existe el plato
            // visible={isProductModalOpen} 
            // visible={true} 
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={[
              <Button 
                  key="back" 
                  onClick={handleCancel}
              >
                Cerrar
              </Button>,
              <Button
                  key="submit"
                  htmlType='submit'
                  form='category-form'
                  style={{ backgroundColor: '#74cc26', color: 'white' }}    
              >
                Guardar
              </Button>,
          ]}
        >
        <Form
            id="category-form"
            labelCol={{ span: 8 }}
            layout="horizontal"
            wrapperCol={{
                span: 16,
            }}
            onFinish={ handleOk }
        >
            <Form.Item
                label="Despachador"
                name="dispenser"
                key="dispenser"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
              {
                turns && (
                  <Select
                    defaultValue={ turns[0].name }
                  >
                    {
                      turns.map( t => (
                        <Select.Option
                          key={ t._id }
                        >
                          <a>Inicio: <Tag color="cyan">{t.startTime}</Tag> Fin: <Tag color="magenta">{t.endTime}</Tag></a>
                        </Select.Option>
                      ))
                    }
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item
                label="Turno"
                name="turn"
                key="turn"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
              {
                turns && (
                  <Select
                    defaultValue={ turns[0]._id }
                  >
                    {
                      turns.map( t => (
                        <Select.Option
                          key={ t._id }
                        >
                          <a>Inicio: <Tag color="cyan">{t.startTime}</Tag> Fin: <Tag color="magenta">{t.endTime}</Tag></a>
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
                <DatePicker onChange={handleDateChange} />
            </Form.Item>
            <Form.Item
                label="Estado"
                name="status"
                key="status"
                rules={[
                    {
                      required: true,
                      message: 'Campo reuqerido',
                    },
                  ]}
            >
                <Switch checked onChange={()=> {}}/>
            </Form.Item>
        </Form>
        </Modal>
      </>
    )
}
