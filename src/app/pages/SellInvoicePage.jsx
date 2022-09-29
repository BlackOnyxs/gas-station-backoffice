import React, { useEffect } from 'react';
import { Row, Col, Button} from 'antd';

import { TableConfigInvoice } from '../components/sellInvoice/TableConfigInvoice';
import { AddInvoiceModal } from '../components/sellInvoice/AddInvoiceModal';
import { useSellInvoiceStore } from '../../hooks/useSellInvoiceStore';
import { LoadingPage } from '../components/common/LoadingPage';
import { useUiStore } from '../../hooks';

export const SellInvoicePage = () => {
  const { isLoadingSellInvoices, startLoadingSellInvoices } = useSellInvoiceStore();
  const { openModal } = useUiStore();

  useEffect(() => {
    startLoadingSellInvoices()
  }, [])
  
    return (
        <>
        {
          ( isLoadingSellInvoices )
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
                      Agregar Venta
                  </Button>
                </Col>
              </Row>
              <TableConfigInvoice />
              <AddInvoiceModal />
              </>
            )
        }
        </>
    )
}
