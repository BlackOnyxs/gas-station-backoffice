import React from 'react';
import { Form, Select, Switch, Tag, DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';

import { useTurnsStore, useWorkersStore } from '../../../hooks';
import { LoadingPage } from '../common/LoadingPage';

export const FormSchedule = () => {
    const form = Form.useFormInstance();
    const { workers, isLoadingWorkers } = useWorkersStore();
    const { turns, isLoadingTurns } = useTurnsStore();

    const handleDateChange = (date)=> {}
  
      const handleStatusChange = () => {}

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
                    <Select>
                      {
                        workers.map( d => (
                          <Select.Option
                            key={ d.uid }
                          >
                           { d.name }
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
                    <Select>
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
                  <DatePicker  locale={ locale } onChange={handleDateChange} />
              </Form.Item>
              
              </>
            }
          </>
        </>
    )
}



