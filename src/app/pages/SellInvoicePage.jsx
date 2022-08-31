import React from 'react';
import { Row, Col, Button} from 'antd';

import { TableConfigInvoice } from '../components/sellInvoice/TableConfigInvoice';
import { AddInvoiceModal } from '../components/sellInvoice/AddInvoiceModal';

export const SellInvoicePage = () => {
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
                  Agregar Venta
              </Button>
            </Col>
          </Row>
          <TableConfigInvoice />
          <AddInvoiceModal />
        </>
    )
}
