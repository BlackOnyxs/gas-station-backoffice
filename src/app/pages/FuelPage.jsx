import React from 'react';
import { Row, Col, Button} from 'antd';
import { TableConfigFuel } from '../components/fuel/TableConfigFuel';
import { AddFuelModal } from '../components/fuel/AddFuelModal';

export const FuelPage = () => {
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
                  Agregar Combustible
              </Button>
            </Col>
          </Row>
          <TableConfigFuel />
          <AddFuelModal />
        </>
      )
}
