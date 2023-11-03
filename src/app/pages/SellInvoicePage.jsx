import React, { useEffect } from 'react';
import { Row, Col, Button} from 'antd';
import Swal from 'sweetalert2';

import { TableConfigInvoice } from '../components/sellInvoice/TableConfigInvoice';
import { AddInvoiceModal } from '../components/sellInvoice/AddInvoiceModal';
import { useSellInvoiceStore } from '../../hooks/useSellInvoiceStore';
import { LoadingPage } from '../components/common/LoadingPage';
import { useUiStore } from '../../hooks';

export const SellInvoicePage = () => {
  const { isLoadingSellInvoices, startLoadingSellInvoices, errorMessage, clearErrorMessage } = useSellInvoiceStore();
  const { openModal } = useUiStore();

  useEffect(() => {
    startLoadingSellInvoices()
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
          ( isLoadingSellInvoices )
            ? <LoadingPage />
            : (
              <>
              <Row>
                <Col span={ 24 } style={{ marginBottom: 15, textAlign: 'end'}}>
                  {/* <Button
                    type="primary"
                    style={{
                      backgroundColor: '#FFA500',
                      borderColor: 'white',
                    }}
                    onClick={ () => openModal()  }
                  >
                      Agregar Venta
                  </Button> */}
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
