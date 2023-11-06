import React from 'react';
import { Form, Select, Tag, DatePicker, Input } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';

import { useTurnsStore, useWorkersStore } from '../../../hooks';
import { LoadingPage } from '../common/LoadingPage';

export const FormSchedule = () => {
    const form = Form.useFormInstance();
    const { workers, isLoadingWorkers, setActiveWorker} = useWorkersStore();
    const { turns, isLoadingTurns,  setActiveTurn } = useTurnsStore();
  
    const handleActiveWorker = ( worker ) => {
      workers.map( w => {
        if ( w.uid === worker ) {
          setActiveWorker( w )
        }
      });
    }

    const handleActiveTurn = ( turn ) => {
      turns.map( t => {
        if ( t._id === turn ) {
          setActiveTurn( t )
        }
      });
    }

    return (
        <>
            <>
            {
              ( isLoadingTurns || isLoadingWorkers )
              ? <LoadingPage />
              : <>
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
                  workers && (
                    
                    <Select onChange={ handleActiveWorker }>
                      {
                        workers.map( d => {
                          if ( d.role === 'DISPENSER_ROLE') {
                            return (
                              <Select.Option
                              key={ d.uid }
                              value={ d.uid }
                            >
                                { d.name }
                              </Select.Option>
                            )
                          }
                        })
                      }
                    </Select>
                  )
                }
              </Form.Item>
              <Form.Item
                label="Monto"
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
                    <Select onChange={ handleActiveTurn }>
                      {
                        turns.map( t => (
                          <Select.Option
                            key={ t._id }
                            value={ t._id }
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
                  <DatePicker  locale={ locale } format={'DD-MM-yyyy'}/>
              </Form.Item>
              
              </>
            }
          </>
        </>
    )
}



