import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Row, Col, Button} from 'antd';

import { TableConfig } from '../components/workers/TableConfig';
import { AddWorkerModal } from '../components/workers/AddWorkerModal';
import {  } from '../../hooks/useWorkersStore';
import { LoadingPage } from '../components/common/LoadingPage';
import { useUiStore, useWorkersStore } from '../../hooks';

export const WorkersPage = () => {

  const { openModal } = useUiStore();
  const { isLoadingWorkers, startLoadingWorkers, errorMessage, clearErrorMessage } = useWorkersStore();

  useEffect(() => {
    startLoadingWorkers()
  }, [])

  useEffect(() => {
    if ( errorMessage !== undefined ) {
      Swal.fire({
        title: 'Error', 
        text: errorMessage, 
        icon: 'error',
      }).then((result) => {
        clearErrorMessage();
      });
    }
  }, [errorMessage])
  
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
