import React from 'react';
import { Row, Col, Button} from 'antd';
import { TableConfigProvider } from '../components/provider/TableConfigProvider';
import { AddProviderModal } from '../components/provider/AddProviderModal';

export const ProviderPage = () => {
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
                  Agregar Proveedor
              </Button>
            </Col>
          </Row>
          <TableConfigProvider />
          <AddProviderModal />
        </>
      )
}
