import React from 'react';

import { Row, Col, Button} from 'antd';
import { TableConfig } from '../components/workers/TableConfig';
import { AddWorkerModal } from '../components/workers/AddWorkerModal';

export const WorkersPage = () => {
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
                  Agregar Colaborador
              </Button>
            </Col>
          </Row>
          <TableConfig />
          <AddWorkerModal />
        </>
      )
}
