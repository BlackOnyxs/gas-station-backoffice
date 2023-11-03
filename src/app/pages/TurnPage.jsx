import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Row, Col, Button} from 'antd';
import { TableConfigTurn } from '../components/turns/TableConfigTurn';
import { AddTurnModal } from '../components/turns/AddTurnModal';
import { useTurnsStore } from '../../hooks/useTurnsStore';
import { useUiStore } from '../../hooks';
import { LoadingPage } from '../components/common/LoadingPage';

export const TurnPage = () => {

  const { openModal } = useUiStore();
  const { isLoadingTurns, startLoadingTurns, errorMessage, clearErrorMessage } = useTurnsStore();

  useEffect(() => {
    startLoadingTurns();
  }, []);
  
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
      ( isLoadingTurns ) 
        ? <LoadingPage />
        : (
          <>
          <Row>
            <Col span={ 24 } style={{ marginBottom: 15, textAlign: 'end'}}>
              <Button
                type="primary"
                style={{
                  backgroundColor: '#FFA500',
                  borderColor: 'white',
                }}
                onClick={ () => openModal() }
              >
                  Agregar Turno
              </Button>
            </Col>
          </Row>
          <TableConfigTurn />
          <AddTurnModal />
          </>
        )
    }
    </>
  )
}
