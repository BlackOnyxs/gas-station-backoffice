import React from 'react';
import { Row, Col, Button} from 'antd';
import { TableConfigTurn } from '../components/turns/TableConfigTurn';
import { AddTurnModal } from '../components/turns/AddTurnModal';

export const TurnPage = () => {
  return (
    <>
      <Row>
        <Col span={ 24 } style={{ marginBottom: 15, textAlign: 'end'}}>
          <Button
            type="primary"
            style={{
              backgroundColor: '#74cc26',
              borderColor: 'white',
            }}
            onClick={ () => {}  }
            // onClick={ () => openProductModal()  }
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
