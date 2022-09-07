import React from 'react';

import { Row, Col, Button} from 'antd';
import { TableConfig } from '../components/workers/TableConfig';
import { AddWorkerModal } from '../components/workers/AddWorkerModal';
import { useWorkersStore } from '../../hooks/useWorkersStore';
import { LoadingPage } from '../components/common/LoadingPage';
import { useUiStore } from '../../hooks';
import { useEffect } from 'react';

export const WorkersPage = () => {

  const { openModal } = useUiStore();
  const { isLoadingWorkers, startLoadingWorkers  } = useWorkersStore();

  useEffect(() => {
    startLoadingWorkers()
  }, [])
  
    return (
      <>
      { 
        ( isLoadingWorkers ) 
          ? <LoadingPage />
          : (
            <>
              <Row>
                <Col span={ 24 } style={{ marginBottom: 15, textAlign: 'end'}}>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: '#74cc26',
                      borderColor: 'white',
                    }}
                    onClick={ () => openModal()  }
                  >
                      Agregar Colaborador
                  </Button>
                </Col>
              </Row>
              <TableConfig />
              <AddWorkerModal />
            </>
          )
      }
      </>
      )
}
