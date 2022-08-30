import React from 'react';
import { Row, Col, Button} from 'antd';
import { AddOilModal } from '../components/oil/AddOilModal';
import { TableConfigOil } from '../components/oil/TableConfigOil';
export const OilPage = () => {
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
                  Agregar Aceite
              </Button>
            </Col>
          </Row>
          <TableConfigOil />
          <AddOilModal />
        </>
      )
}
