import React from 'react';
import { Row, Col, Button} from 'antd';
import { TableConfigInvoice } from '../components/buyInvoice/TableConfigInvoice';
import { AddInvoiceModal } from '../components/buyInvoice/AddInvoiceModal';

export const BuyInvoicePage = () => {
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
              Agregar Compra
          </Button>
        </Col>
      </Row>
      <TableConfigInvoice />
      <AddInvoiceModal />
    </>
)
}
